import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {CollectionType, dataType, PageType} from "../helper/DirFormatter";
import COLLECTION_API from "../api/collection";
import {DataContext} from "./DataProvider";
import PAGES_API from "../api/pages";

export const DragContext = React.createContext<{
    isDragging:boolean,
    onDrag : (data:CollectionType|PageType)=>void
    dragData :CollectionType|PageType|null
    closeDrag : (data:{ id : number | null , type : "COLLECTION" | "PAGE" })=>void
    onMove : (event: React.MouseEvent<HTMLSpanElement, MouseEvent> , id:number|null , type : "COLLECTION" | "PAGE" )=>void
    hoverData: {id: number | null , type: "COLLECTION" | "PAGE" } | null
}>({
    isDragging:false,
    onDrag:()=>{},
    closeDrag:()=>{},
    onMove:()=>{},
    dragData : null,
    hoverData: null
})

const DragProvider = ({children}:PropsWithChildren) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [dragData, setDragData] = useState<PageType|CollectionType|null>(null)
    const {data , setData} = useContext(DataContext)
    const [mousePos, setMousePos] = useState({x:0,y:0})
    const [hoverData, setHoverData] = useState<{ id:number|null , type : "COLLECTION" | "PAGE"} | null>(null)

    useEffect(() => {
        const handleMousePos = (e:MouseEvent) =>{
            setMousePos({
                x : e.x,
                y : e.y
            })
        }
        document.addEventListener("mousemove", handleMousePos)

        return () =>{
            document.removeEventListener("mousemove", handleMousePos)
        }
    }, []);

    const onDrag = (data:CollectionType|PageType) =>{
        setIsDragging(true)
        setDragData(data)
    }

    const onMove = (event: React.MouseEvent<HTMLSpanElement, MouseEvent> , id:number|null , type : "COLLECTION" | "PAGE" ) =>{
        setHoverData({
            id : id,
            type: type,
        })
    }

    const closeDrag = async (dataParent: { id : number | null , type : "COLLECTION" | "PAGE" }) =>{
        if(!dragData || !isDragging) return;

        console.log(dataParent)

        if(dataParent.id === dragData.id && dragData.type === dataParent.type) return;

        let isSuccess = false;

        if(dragData.type === "COLLECTION"){
            await COLLECTION_API.MOVE({
                id : dragData.id,
                parent : dataParent.id
            })
        }else{
            await PAGES_API.MOVE({
                id : dragData.id,
                parent : dataParent.id
            })
        }

        const clone = data.map((single)=>{
            if(dragData && single.id === dragData.id){
                if("parent" in single){
                    single.parent = dataParent.id
                }else if(dataParent.id){
                    single.collectionRef = dataParent.id
                }
            }
            return single
        })
        setData(clone);
        setIsDragging(false)
        setDragData(null)
    }

    return (
        <DragContext.Provider value={{isDragging,onDrag,closeDrag,dragData,onMove,hoverData}}>
            {
                isDragging && dragData && (
                    <div className={`absolute z-30 pointer-events-none bg-slate-100 opacity-70 rounded-md w-[200px] p-1 text-xs`} style={{
                        left : mousePos.x + 10,
                        top : mousePos.y - 10,
                        translate: "-50%",
                    }}>
                        {dragData.name}
                    </div>
                )
            }
            {children}
        </DragContext.Provider>
    );
};

export default DragProvider;