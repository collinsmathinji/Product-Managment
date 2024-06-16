import React from "react";
 
const SideBar=({menuItems})=>{
console.log(menuItems)
    return(
       <>
       <div className="bg-gray-300">
            {menuItems.map((item,index)=>{
                return(
                 <div className="flex flex-col  justify-evenly text-xl p-3 h-full">
                    <p key={index} className="mb-2 border-b-2 p-3 hover:bg-blue-300 flex flex-row gap-4">{item.icon}{item.text}</p>
                </div>
                )
            })}
           </div>
       </>
    )
}
export default SideBar