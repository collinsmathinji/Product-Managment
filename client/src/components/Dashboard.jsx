import React,{useEffect,useState} from "react";
import Navbar from "./Navbar";
import SideBar from "./sideBar";
import { MdDashboard } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdAccountTree } from "react-icons/md";
const Dashboard=({children})=>{
    const[isSideBarOpen,setIsSideBarOpen]=useState(true)
    const HandleSideBar=()=>{
        setIsSideBarOpen(!isSideBarOpen)
    }
    const menuItems = [
        { icon: <MdDashboard className="hover:bg-green-500" />, text: 'Dashboard', to: '/Dashboard', colorClass: 'icon' },
        { icon: <MdAccountBalanceWallet/>, text: "Sales", to: '/Sales', colorClass: 'icon' },
        { icon: <TbTargetArrow  />, text: 'Items Sold', to: '/', colorClass: 'icon' },
        { icon: < MdAccountTree />, text: 'UnAccounted', to: '/', colorClass: 'icon' },
        { icon: < CgProfile  />, text: 'User Profile', to: '/', colorClass: 'icon' },
    ];
return(
<>
<div>
<Navbar sideBar={HandleSideBar}/>
</div>
<div className="flex lg:flex-row">
   
<div className="w-1/5 bg-gray-300 rounded-lg">
{isSideBarOpen && 
    <SideBar menuItems={menuItems}/>
}
    </div>
    <div className="w-4/5 h-[100%]">{children}</div>

</div>
</>
)
}
export default Dashboard