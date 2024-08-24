import React, {useEffect, useState} from 'react'
import {RES_USER_PROFILE} from "../utils/types/api/user";
import USER_API from "../utils/api/user";
import {useNavigate} from "react-router-dom";
import {delete_cookie} from "../utils/helper/cookie";
import Search from "./Search";

const Navbar = () => {
    const [userData, setUserData] = useState<RES_USER_PROFILE>()
    const navigate = useNavigate()

    useEffect(() => {
        USER_API.GET_PROFILE().then((res)=>{
                console.log(res)
            if(res.code === 200){
                setUserData(res.data)
            }else{
                console.log("NAVIGATING : ",res)
                navigate("/login")
            }
        })
    }, []);

    const handleSignOut = async () => {
        delete_cookie("token");
        navigate("/login")
    }

  return (
    <>
      <nav className='p-2 flex justify-between'>
          <Search />
          <div className={`flex gap-2 items-center`}>
              <img className={`max-w-[30px] aspect-square rounded-full border-gray-200 border-[1px] bg-white`} src={userData ? userData.profile : ""} alt={"user profile"} />
              <span>{userData && userData.name}</span>
              <button onClick={handleSignOut} className={`bg-white w-[30px] rounded-md aspect-square flex justify-center items-center`}><i className="fi fi-ts-arrow-left-from-arc"></i></button>
          </div>
      </nav>
    </>
  )
}

export default Navbar
