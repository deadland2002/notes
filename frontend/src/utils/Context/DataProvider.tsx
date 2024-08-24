import React, {PropsWithChildren, useEffect} from 'react';
import {dataType} from "../helper/DirFormatter";
import COLLECTION_API from "../api/collection";

export const DataContext = React.createContext<{
    data:dataType,
    handleAddData(     dataParent: dataType): void
    setData: React.Dispatch<React.SetStateAction<dataType>>
}>({
    data : [] ,
    handleAddData:()=>{},
    setData:()=>{}
})

const DataProvider = ({children}:PropsWithChildren) => {
    const [data,setData] = React.useState<dataType>([]);

    const handleAddData = (dataParent: dataType) => {
        const dataMap = new Map(data.map(item => [`${item.id}-${item.type}`, item]));

        dataParent.forEach(item => {
            dataMap.set(`${item.id}-${item.type}`, item);
        });

        const uniqueData = Array.from(dataMap.values());
        setData(uniqueData);
    };

    useEffect(() => {
        COLLECTION_API.Get_All_By_Parent_ID({parent:null}).then((res)=>{
            if(res.code === 200){
                setData(res.data)
            }
        })
    }, []);

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <DataContext.Provider value={{data,handleAddData,setData}}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;