import React from "react";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar=({sideBar})=>{

    return(
  <>
  <div className="flex flex-row justify-between p-5 bg-blue-400">
    <div> 
    <p className="font-bold text-2xl">Profitable</p> 
     </div>
    <div >
    <p className="lg:hidden" onClick={sideBar}><GiHamburgerMenu className="w-8 h-8"/></p>
    <p className="hidden lg:block"><CgProfile className="w-8 h-8"/></p>
    </div>
  </div>
  </>
    )
}
export default Navbar