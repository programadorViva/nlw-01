import React from 'react';
import { BrowserRouter, Route, Routes,Link} from 'react-router-dom';


import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';


const MyRoutes = () => {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-point" element={<CreatePoint />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MyRoutes;