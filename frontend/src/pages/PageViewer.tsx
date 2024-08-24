import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import PAGES_API from "../utils/api/pages";
import {PageType} from "../utils/helper/DirFormatter";

const PageViewer = () => {
    const {pageId} = useParams()
    const [initialData, setInitialData] = useState<string | null>(null)
    const [pageData, setPageData] = useState<PageType | null>(null)
    const [isReadOnly, setIsReadOnly] = useState(true)
    const [value, setValue] = React.useState<string | null>("**Hello world!!!**");

    const [isDataFetching, setIsDataFetching] = useState(false)
    const [isDataUpdating, setIsDataUpdating] = useState(false)

    useEffect(() => {
        setInitialData(null)
        setValue(null)
        setIsDataUpdating(false)
    }, [pageId]);

    useEffect(() => {
        if(pageId){
            (async function(){
                setIsDataFetching(true)
               await PAGES_API.GET({
                    id:Number(pageId)
                }).then(async (res)=>{
                    if(res.code === 200){
                        await new Promise(resolve => setTimeout(resolve, 500))
                        setInitialData(res.data.content)
                        setPageData(res.data)
                    }
                })
                setIsDataFetching(false)
            })()
        }
        return ()=>{
            setIsDataFetching(false)
        }

    }, [pageId]);

    useEffect(() => {
        setValue(initialData)
    }, [initialData]);

   const handleDataSave = async () =>{
        if(!isDataUpdating){
            setIsDataUpdating(true)
            await PAGES_API.SAVE({
                id:Number(pageId),
                content:value ?? ""
            }).then(async (res)=>{
                if(res.code === 200){
                    await new Promise(resolve => setTimeout(resolve, 500))
                    setInitialData(value)
                }
            })
            setIsDataUpdating(false)
        }
   }

   if(isDataFetching){
       return <div className={`p-2 m-2 rounded-md bg-white h-full flex-col gap-2 flex justify-center items-center`}>
           <div role="status">
               <svg aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
       </div>
   }

    return (
        <div className={`flex flex-col gap-2 h-full`}>
            <div className={`px-4 font-semibold text-2xl`}>
                {pageData ? pageData.name : "Loading..."}
            </div>
            <div className={`p-2 m-2 rounded-md bg-white overflow-auto flex flex-col gap-2 h-full`}>
                <div className={`flex justify-between`}>
                    <button
                        className={`${isReadOnly ? "bg-sky-100" : "bg-purple-100"} min-w-[80px] rounded-md text-xs px-2 py-1`}
                        onClick={() => {
                            setIsReadOnly(prev => !prev)
                        }}>{isReadOnly ? "Read Only" : "Edit"}</button>

                    <div className={`flex justify-center items-center gap-2`}>
                        {
                            initialData !== value && (
                                <button className={`bg-green-100 text-green-500 min-w-[50px] rounded-md text-xs px-2 py-1`}
                                        onClick={handleDataSave}>
                                    {
                                        isDataUpdating ? "Saving" : "Save"
                                    }
                                </button>
                            )
                        }
                        {
                            isDataUpdating && (
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
                            )
                        }
                    </div>
                </div>

                {
                    isReadOnly ? (
                        <MDEditor.Markdown source={value ?? ""}
                                           style={{
                                               whiteSpace: 'pre-wrap',
                                               maxHeight: 'calc(100vh - 160px)',
                                               overflow: 'auto',
                                           }}
                        />
                    ) : (
                        <MDEditor
                            value={value ?? ""}
                            onChange={(val) => setValue(val ?? "")}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                            style={{
                                minHeight: 'calc(100% - 50px)'
                            }}
                            preview="edit"
                        />
                    )
                }
            </div>
        </div>
    );
};

export default PageViewer;