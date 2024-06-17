import React from "react";
import { Link } from 'react-router-dom';
const SideBar=({menuItems})=>{
console.log(menuItems)
    return(
       <>
       <div className="">
            {menuItems.map((item,index)=>{
                return(
                    <Link key={index} to={`${item.to}`}>
                 <div className="flex flex-col  justify-evenly text-xl p-3 h-full">
                    <p key={index} className="mb-2 border-b-2 p-3 hover:bg-blue-300 hover:rounded-lg hover:cursor-pointer flex flex-row gap-4">{item.icon}{item.text}</p>
                </div>
                </Link>
                )
            })}
           </div>
       </>
    )
}
export default SideBar