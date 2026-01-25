import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './Pages/Header.jsx'
import MainPage from "./Pages/MainPage.jsx";
import Footer from "./Pages/Footer.jsx";
import Profile from "./Pages/Profile.jsx";
import CarPage from "./Pages/CarPage.jsx";
import SearchPage from "./Pages/SearchPage.jsx";
import SellerPage from "./Pages/SellerPage.jsx";
import AdminPanel from "./Pages/AdminPanel.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' index element={<MainPage/>}/>
                <Route path='/profile' element={<Profile/>}>
                    <Route path='stars' element={<Profile/>}/>
                    <Route path='messages' element={<Profile/>}>
                        <Route path='dialog' element={<Profile />}/>
                    </Route>
                    <Route path='settings' element={<Profile/>}/>
                    <Route path='enter' element={<Profile />}/>
                    <Route path='register' element={<Profile />}/>
                </Route>
                <Route path='/car_page' element={<CarPage/>}/>
                <Route path='/search' element={<SearchPage/>}/>
                <Route path='/seller_page' element={<SellerPage/>}/>
                <Route path='/AdminPanel' element={<AdminPanel />}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </StrictMode>,
)
