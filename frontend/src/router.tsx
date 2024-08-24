import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import SignIn from './pages/SignIn'
import DataProvider from "./utils/Context/DataProvider";
import OptionsProvider from "./utils/Context/OptionsProvider";
import PageViewer from "./pages/PageViewer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DragProvider from "./utils/Context/DragProvider";

const CustomRouter = () => {
    return (
        <DataProvider>
            <DragProvider>
                <OptionsProvider>
                    <BrowserRouter>
                            <Routes>
                                <Route path='/login' element={<SignIn/>}/>
                                <Route path='/' Component={Layout}>
                                    <Route path='/' element={<Home/>}/>
                                    <Route path='/:pageId/' element={<PageViewer/>}/>
                                </Route>
                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                    </BrowserRouter>
                </OptionsProvider>
            </DragProvider>
        </DataProvider>
    );
}

export default CustomRouter
