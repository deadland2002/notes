import React, {FormEvent, useContext, useEffect, useState} from 'react'
import Directory, {dataType, ResultArr} from "../utils/helper/DirFormatter";
import DirectoryMapper from "./DirectoryMapper";
import useDirCreator from "../utils/hooks/useDirCreator";
import {OptionsContext} from "../utils/Context/OptionsProvider";

const Sidebar = () => {
    const {dirData , DataAdder , onAdd , handleAddData} = useDirCreator()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const Options = useContext(OptionsContext)

    useEffect(() => {
        const handleClose = () =>{
            if(!Options) return
            Options.onClose();
        }

        document.addEventListener("click", handleClose)

        return ()=>{
            document.removeEventListener("click", handleClose)
        }
    }, []);

  return (
      <div className='h-full md:relative sidebar bg-white flex w-[50px] md:min-w-[250px]'>
          <div className={`flex justify-center p-4 md:hidden`} onClick={()=>setIsMenuOpen(!isMenuOpen)}>
              <i className="fi fi-br-menu-burger"></i>
          </div>

          <div className={`absolute md:relative left-[40px] md:left-0 h-full flex-col gap-4 z-10 bg-white overflow-hidden transition-all duration-500 ${isMenuOpen ? "w-[0px]" : "w-[250px]"} md:w-[250px] md:flex`}>
              <div className={`flex flex-col gap-4 min-w-[250px] p-2 px-5`}>
                  <div className={`flex justify-center p-2`}>
                      <span className={`text-2xl text-gray-700`}>Notes</span>
                  </div>

                  <div>
                      <button
                          className={`w-full flex rounded-md justify-center items-center p-2 bg-slate-200 text-slate-500`}
                          onClick={() => {
                              onAdd("COLLECTION")
                          }}><i className="fi fi-rr-square-plus"></i></button>
                  </div>

                  <div className={`flex overflow-auto flex-col h-full`}>
                      <DirectoryMapper data={(new Directory(dirData)).createObject()}/>
                      <DataAdder handleAdd={(e) => {
                          handleAddData(e, null)
                      }}/>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Sidebar
