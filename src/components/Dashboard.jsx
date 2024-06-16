import React,{useEffect,useState} from "react";
import Navbar from "./Navbar";
import SideBar from "./sideBar";
import { MdDashboard } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdAccountTree } from "react-icons/md";
const Dashboard=({children})=>{
    const[isSideBarOpen,setIsSideBarOpen]=useState(false)
    const HandleSideBar=()=>{
        setIsSideBarOpen(!isSideBarOpen)
    }
    const menuItems = [
        { icon: <MdDashboard className="hover:bg-green-500" />, text: 'Dashboard', to: '/Summits', colorClass: 'icon' },
        { icon: <MdAccountBalanceWallet/>, text: "Sales", to: '/Contacts', colorClass: 'icon' },
        { icon: <TbTargetArrow  />, text: 'Items Sold', to: '/Ambassador-info', colorClass: 'icon' },
        { icon: < MdAccountTree />, text: 'UnAccounted', to: '/Leadership', colorClass: 'icon' },
        { icon: < CgProfile  />, text: 'User Profile', to: '/Leadership', colorClass: 'icon' },
    ];
return(
<>
<div>
<Navbar sideBar={HandleSideBar}/>
</div>
<div className="flex lg:flex-row">
   
<div className="w-1/4 bg-gray-300">
{isSideBarOpen && 
    <SideBar menuItems={menuItems}/>
}
    </div>
    <div className="w-3/4">{children}</div>

</div>
</>
)
}
export default Dashboard