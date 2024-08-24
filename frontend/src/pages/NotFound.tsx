import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={`flex h-screen justify-center items-center`}>
            <div className={`flex flex-col gap-2 text-center`}>
                <img src={"/not-found.jpg"} className={` w-ful max-w-[400px]`} alt={`home-img`}/>
                <div className={`flex flex-col`}>
                    <div className={`text-gray-500`}>Hi there , looks like you are lost</div>
                    <div className={`text-gray-500`}>try going to <Link to={"/"} className={`text-sky-500`}>Home</Link> page</div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;