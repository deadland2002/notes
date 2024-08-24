import React, {FormEvent, useCallback, useContext, useState} from 'react';
import {DataContext} from "../Context/DataProvider";
import COLLECTION_API from "../api/collection";
import PAGES_API from "../api/pages";

const UseDirCreator = () => {
    const [isAdding,setIsAdding] = useState<"COLLECTION" | "PAGE" | "RENAME" | undefined>(undefined)
    const [isUpdating,setIsUpdating] = useState<"COLLECTION" | "PAGE" | undefined>(undefined)
    const {data : dirData,setData , handleAddData} = useContext(DataContext)

    const handleAdd = async (e:FormEvent<HTMLFormElement> , parent : number | null ) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement;
        const dataForm = new FormData(form)
        const name = dataForm.get("name");

        if(!name){
            setIsAdding(undefined)
            return alert("Name required")
        }

        if(isAdding === "COLLECTION"){
            const response = await COLLECTION_API.ADD({
                name : name.toString(),
                parent : parent
            });
            if(response.code === 200){
                handleAddData([{
                    ...response.data,
                    type:"COLLECTION"
                }])
            }
        }else if (isAdding === "PAGE" &&parent !== null){
            const response = await PAGES_API.ADD({
                name : name.toString(),
                collectionId : parent
            });
            if(response.code === 200){
                handleAddData([{
                    ...response.data,
                    type:"PAGE"
                }])
            }
        }

        setIsAdding(undefined);
    }

    const onAdd = (type:"COLLECTION" | "PAGE" | "RENAME") =>{
        setIsAdding(type)
    }

    const onRename = async (e:FormEvent<HTMLFormElement> , id : number , type : "COLLECTION" | "PAGE" ) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement;
        const dataForm = new FormData(form)
        const name = dataForm.get("name");

        if (!name) {
            setIsAdding(undefined)
            return alert("Name required")
        }

        let isSuccess = false;

        console.log(isAdding , name.toString() , id , type)

        if(type === "COLLECTION"){
            const response = await COLLECTION_API.RENAME({
                name : name.toString(),
                id : id
            });
            if(response.code === 200){
                isSuccess = true
            }
        }else if (type === "PAGE" &&parent !== null){
            const response = await PAGES_API.RENAME({
                name : name.toString(),
                id : id
            });
            if(response.code === 200){
                isSuccess = true
            }
        }

        console.log("done")

        if(isSuccess)
        setData(prevState => prevState.map((data)=>{
            if(data.id === id && data.type === type){
                return {
                    ...data,
                    name : name.toString()
                }
            }else{
                return  data
            }
        }))

        setIsAdding(undefined)
    }

    const onDelete = async (id : number , type : "COLLECTION" | "PAGE" ) => {
        let isSuccess = false;

        if(type === "COLLECTION"){
            const response = await COLLECTION_API.DELETE({
                id : id
            });
            if(response.code === 200){
                isSuccess = true
            }
        }else if (type === "PAGE" &&parent !== null){
            const response = await PAGES_API.DELETE({
                id : id
            });
            if(response.code === 200){
                isSuccess = true
            }
        }

        console.log("done")

        if(isSuccess)
        setData(prevState => prevState.filter((data)=>!(data.id === id && data.type === type)))
    }

    const DataAdder = useCallback(({handleAdd}:{handleAdd:(e:FormEvent<HTMLFormElement>)=>void})=>{
       return <> {
            (isAdding === "COLLECTION" || isAdding === "PAGE") && (
                <form onSubmit={handleAdd} className={``}>
                    <input className={`border-[1px] border-slate-400 px-2 outline-0 rounded-md`} name={"name"} autoFocus/>
                </form>
            )
        }
       </>
    },[isAdding])


    const DataRename = useCallback(({handleRename}:{handleRename:(e:FormEvent<HTMLFormElement>)=>void})=>{
        return <> {
            isAdding === "RENAME" && (
                <form onSubmit={handleRename} className={``}>
                    <input className={`border-[1px] border-slate-400 px-2 outline-0 rounded-md`} name={"name"} autoFocus/>
                </form>
            )
        }
        </>
    },[isAdding])

    return {isAdding , dirData , DataAdder , onAdd , handleAddData: handleAdd , DataRename , onRename , onDelete}
};

export default UseDirCreator;