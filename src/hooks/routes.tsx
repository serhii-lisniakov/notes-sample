import React from "react"
import {Route, Routes} from 'react-router-dom'
import {NotePage} from "../pages/NotePage/NotePage";

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="note/:id" element={<NotePage/>}/>
            <Route path="*" element={<NotePage/>}/>
        </Routes>
    )
}
