import React, {useContext, useEffect} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getCookieByName } from '../utils/cookie'
import USER_API from '../utils/api/user'
import COLLECTION_API from "../utils/api/collection";
import {DataContext} from "../utils/Context/DataProvider";

const Layout = () => {
  const navigate = useNavigate()
  const {handleAddData} = useContext(DataContext)

  useEffect(() => {
    if (!getCookieByName('token')) {
      navigate('/login')
    } else {
      (async () => {
        const response = await COLLECTION_API.Get_All_By_Parent_ID({parent:null})
        if(response.code === 200){
          handleAddData(response.data)
        }
      })()
    }
  }, [navigate])

  if (!getCookieByName('token')) {
    return <></>
  }

  return (
    <>
      <div className='flex w-full h-screen'>
        <Sidebar />
        <div className='flex flex-col gap-2 w-full bg-slate-100'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
