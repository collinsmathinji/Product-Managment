import React,{useState,useEffect} from "react";

const ItemEntry=()=>{
    const[formData,setFormData]=useState({
        itemImage:'',
        itemName:'',
        numberOfItems:0,
        itemBuyingPrice:0,
        itemSellingPrice:0
    })
    const HandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    return(
        <div className="item-center ">
        <div className="p-4 border bg-white">
            <input
              name="itemName"
              value={formData.itemName}
              onChange={HandleChange}
            />
        </div>
        </div>
    )
}
export default ItemEntry