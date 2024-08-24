import React, {createContext, PropsWithChildren, useCallback, useEffect, useState} from 'react';

interface OptionsType{
    isVisible : boolean,
    position : {x:number,y:number},
    onClick : (element:JSX.Element,position:{x:number,y:number},elementId : string)=>void,
    onClose : ()=>void,
}

export const OptionsContext = createContext<OptionsType | undefined>(undefined);

const OptionsProvider = ({children}:PropsWithChildren) => {
    const [position, setPosition] = useState({x:0,y:0})
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [optionsJsx, setOptionsJsx] = useState<JSX.Element>(<></>)
    const [currentId, setCurrentId] = useState<string>("")

    const onClick = (element:JSX.Element,position:{x:number,y:number},elementId : string) =>{
        if(elementId === currentId){
            setIsVisible(prev => !prev)
        }else{
            setIsVisible(true)
        }
        setCurrentId(elementId)
        setPosition(position)
        setOptionsJsx(element)
    }

    const onClose = () =>{
        setIsVisible(false)
        setOptionsJsx(<></>)
    }

    return <OptionsContext.Provider value={{isVisible, position, onClick,onClose}}>
        <div className={`absolute z-20 right-5 top-5 w-fit p-1 bg-white rounded-md border-2 border-slate-200 opacity-0 transition-opacity duration-500 ${isVisible ? "pointer-events-auto opacity-100": "pointer-events-none"}`} style={{
            left: position.x + 20,
            top: position.y,
        }}
        onClick={()=>{
            setIsVisible(false)
        }}
        >
            {optionsJsx}
        </div>
        {children}
    </OptionsContext.Provider>;
};

export default OptionsProvider;