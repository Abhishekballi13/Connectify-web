import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Body = () => {
  return (
    <div>
    {/* providing outlet in body,as we created child elements of body in app.jsx */}
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body