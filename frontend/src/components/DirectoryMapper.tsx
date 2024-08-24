import React, {useContext, useEffect, useState} from 'react';
import {CollectionType , PageType, ResultArr} from "../utils/helper/DirFormatter";
import useDirCreator from "../utils/hooks/useDirCreator";
import {OptionsContext} from "../utils/Context/OptionsProvider";
import COLLECTION_API from "../utils/api/collection";
import {DataContext} from "../utils/Context/DataProvider";
import {useNavigate, useSearchParams} from "react-router-dom";
import {DragContext} from "../utils/Context/DragProvider";

const DirectoryMapper = ({data,openParent}: { data : ResultArr , openParent?:()=>void}) => {
    const { isDragging  , closeDrag , onMove , hoverData } = useContext(DragContext)

    return <div className={`flex flex-col px-2 rounded-md ${isDragging && hoverData && hoverData.type === "COLLECTION" && hoverData.id === null && "bg-slate-100"}`}
               onMouseUpCapture={()=>{
                   closeDrag({
                       id : null,
                       type: "COLLECTION"
                   })
               }}
                onMouseMoveCapture={(e)=>{
                    if(isDragging){
                        onMove(e,null,"COLLECTION")
                    }
                }}

    >
        { data.map((single) => <DirCollection single={single} key={`map-${single.id}-${single.type}`} openParent={openParent}/>) }
    </div>
};

export default DirectoryMapper;


const ArrayMapper = ({data , openParent}: { data : ResultArr , openParent?:()=>void}) => {
    const { isDragging  , closeDrag , onMove , hoverData } = useContext(DragContext)

    return <div className={`flex flex-col px-2 rounded-md ${isDragging && hoverData && hoverData.type === "COLLECTION" && hoverData.id === null && "bg-slate-100"}`}>
        { data.map((single) => <DirCollection single={single} key={`map-${single.id}-${single.type}`} openParent={openParent}/>) }
    </div>
};



const DirCollection = ({single,openParent}:{single:CollectionType | PageType,openParent?:()=>void}) => {
    const [isChildVisible, setIsChildVisible] = React.useState(false);
    const {DataAdder , onAdd , handleAddData , DataRename , onRename , isAdding , onDelete , } = useDirCreator()
    const Options = useContext(OptionsContext)
    const { handleAddData : setCollectionData} = useContext(DataContext)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const navigate = useNavigate();
    const { isDragging , onDrag  , closeDrag , dragData , onMove , hoverData} = useContext(DragContext)

    const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout>()

    const [params] = useSearchParams()

    useEffect(() => {
        const id = params.get("coll")
        if(id && Number(id) === single.id && openParent) {
            console.log("coll", id , openParent)
            openParent()
        }else if(id && Number(id) === single.id){
            console.log("ID",id,single)
        }
        console.log("ID",id,single.id)
    }, [params.get("coll")]);

    if(!Options)
        return <></>

    const OptionsCollectionJsx = () =>{
        return <div className={`flex flex-col gap-2 text-xs`}>
            <button className={`flex hover:bg-slate-100 p-1 rounded-md`} onClick={() => {
                onAdd("COLLECTION")
                setIsChildVisible(true)
                Options?.onClick(<></>, {x: 0, y: 0}, single.id.toString())
            }}>Add Collection
            </button>
            <button className={`flex hover:bg-slate-100 p-1 rounded-md`} onClick={() => {
                handleOpenDir(single.id);
            }}>{
                isChildVisible ? "Close" : "Open"
            }
            </button>
            <button className={`flex hover:bg-slate-100 p-1 rounded-md`} onClick={() => {
                onAdd("PAGE")
                setIsChildVisible(true)
                Options?.onClick(<></>, {x: 0, y: 0}, single.id.toString())
            }}>Add Page
            </button>
            <button className={`flex hover:bg-slate-100 p-1 rounded-md`} onClick={() => {
                onAdd("RENAME")
                Options?.onClick(<></>, {x: 0, y: 0}, single.id.toString())
            }}>
                Rename
            </button>
            <button className={`flex hover:bg-red-100 p-1 rounded-md text-red-500 `} onClick={()=>{onDelete(single.id,single.type)}}>Delete</button>
        </div>
    }

    const OptionsPageJsx = () => {
        return <div className={`flex flex-col gap-2 text-xs`}>
            <button className={`flex hover:bg-slate-100 p-1 rounded-md`} onClick={() => {
                onAdd("RENAME")
                Options?.onClick(<></>, {x: 0, y: 0}, single.id.toString())
            }}>
                Rename
            </button>
            <button className={`flex hover:bg-red-100 p-1 rounded-md text-red-500 `} onClick={()=>{onDelete(single.id,single.type)}}>Delete</button>
        </div>
    }

    const handleOpenDir = async (parent:number)=>{
        if(!isChildVisible){
            setIsFetchingData(true)
            COLLECTION_API.Get_All_By_Parent_ID({parent}).then(async (res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    await new Promise(resolve => setTimeout(resolve, 500))
                    setIsFetchingData(false)
                    setCollectionData(res.data)
                }
            })
        }
        setIsChildVisible(prev => !prev)
    }

    return <div className={`flex flex-col w-[200px] ${!("children" in single) ? "" : "pb-1"} text-xs z-10 pointer-events-auto ${isDragging && hoverData && hoverData.type === single.type && hoverData.id === single.id && "bg-slate-100"}`}
                onMouseMoveCapture={(e)=>{
                    if (isDragging && single.type === "COLLECTION") onMove(e,single.id,single.type)
                }}
                onMouseUpCapture={()=>{
                    if(single.type === "COLLECTION") {
                        closeDrag(single)
                    }
                    clearTimeout(dragTimeout)
                }}
    >
           <span
               className={`flex relative gap-2 items-center hover:bg-slate-100 p-1 rounded-md ${single.type === "COLLECTION" ? "" : ""} select-none ${isDragging && dragData?.id === single.id && dragData.type === single.type && "bg-sky-100"}`}

               onMouseDownCapture={(e)=>{
                   const Time = setTimeout(()=>{
                       onDrag(single)
                   },500)
                   setDragTimeout(Time)
                }}
           >
                {
                    !(isAdding === "RENAME") ? (
                        <>
                            <button className={`flex w-fit items-center gap-2`} onDoubleClick={(e) => {
                                const {x, y} = (e.target as HTMLButtonElement).getBoundingClientRect()
                                if(single.type === "COLLECTION"){
                                    Options?.onClick(<OptionsCollectionJsx/>, {x, y}, single.id.toString())
                                }else {
                                    Options?.onClick(<OptionsPageJsx/>, {x, y}, single.id.toString())
                                }
                            }}>
                                {
                                    single.type === "COLLECTION" ?
                                        isChildVisible ?
                                            <i className="fi fi-rs-folder-open"></i>
                                            :
                                            <i className="fi fi-rs-folder"></i>
                                        : ""
                                }
                                <span className={`line-clamp-1`}
                                      onClick={()=>{
                                          if(single.type === "COLLECTION"){
                                              handleOpenDir(single.id)
                                          }else {
                                              navigate(`${single.id}`);
                                          }
                                      }}
                                        >{single.name}</span>
                            </button>
                            <div className={`flex items-center justify-center gap-2`}>
                                {
                                    isFetchingData &&
                                    <div role="status">
                                        <svg aria-hidden="true"
                                             className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>

                                }
                                {
                                    single.type === "COLLECTION" ? (
                                        <>

                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    ):(
                        <DataRename handleRename={(e)=>{onRename(e,single.id,single.type)}} />
                    )
                }
           </span>
        {
            "children" in single && isChildVisible ?
                <span className={`pl-5 border-l-2 border-slate-100 flex flex-col`}>
                         <ArrayMapper data={single.children as ResultArr} openParent={()=>{handleOpenDir(single.id)}}/>
                        <DataAdder handleAdd={(e)=>{handleAddData(e,single.id)}} />
                    </span> : ""
        }
    </div>
}