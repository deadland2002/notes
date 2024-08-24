import React from 'react';

const Home = () => {
    return (
        <div className={`flex h-full justify-center items-center`}>
            <div className={`flex flex-col gap-2 text-center`}>
                <div className={`text-gray-500`}>Hi there , Try creating or opening a page</div>
                <img src={"/balloon-man.png"} className={` w-ful max-w-[400px]`} alt={`home-img`}/>
            </div>
        </div>
    );
};

export default Home;