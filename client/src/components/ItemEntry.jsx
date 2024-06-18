import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const ItemEntry = () => {
  const [formData, setFormData] = useState({
    itemImage: '',
    itemName: '',
    description: '',
    numberOfItems: 0,
    itemBuyingPrice: 0,
    itemSellingPrice: 0,
  });
  const navigate=useNavigate()
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, itemImage: file });
      setPreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, image: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
   const Token=localStorage.getItem('token')
    try {
      const response = await axios.post('http://localhost:5000/api/items/create', formDataToSend, {
        headers: {  
        'Authorization': `Bearer ${Token}`,
        'Content-Type': 'multipart/form-data' },
      });
      console.log('Item created successfully:', response.data);
      navigate('/Dashboard')
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div className="flex justify-center pt-20 pb-10">
      <form onSubmit={handleSubmit} className="p-4 border bg-gray-400 w-1/3 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Enter Items Details</h1>
          <div className="mb-4">
            <label className="block mb-2 text-xl mt-4 font-medium" htmlFor="image">
              Item Image
            </label>
            <div className="relative border rounded-md py-2 border-dashed h-40 cursor-pointer">
              <input
                type="file"
                id="image"
                name="itemImage"
                accept="image/*" // Allow only image files
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 border-gray-700 text-sm hover:cursor-pointer"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-full h-full object-cover border-gray-700"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-2 text-sm">
                  <p>Drag your image here</p>
                  <p>
                    <span className="text-blue-600 cursor-pointer">Browse</span> file from your
                    laptop
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 mb-2 font-medium">Name</p>
          <input
            name="itemName"
            placeholder="e.g Cup"
            className="rounded-md p-2"
            value={formData.itemName}
            onChange={handleChange}
          />
          <p className="mt-4 mb-2 font-medium">Number</p>
          <input
            name="numberOfItems"
            type="number"
            placeholder="e.g 10"
            className="rounded-md p-2"
            value={formData.numberOfItems}
            onChange={handleChange}
          />
          <p className="mt-4 mb-2 font-medium">Buying Price</p>
          <input
            name="itemBuyingPrice"
            type="number"
            placeholder="e.g 100"
            className="rounded-md p-2"
            value={formData.itemBuyingPrice}
            onChange={handleChange}
          />
          <p className="mt-4 mb-2 font-medium">Selling Price</p>
          <input
            name="itemSellingPrice"
            type="number"
            placeholder="e.g 150"
            className="rounded-md p-2"
            value={formData.itemSellingPrice}
            onChange={handleChange}
          />
          <p className="mt-4 mb-2 font-medium">Description</p>
          <textarea
            name="description"
            placeholder="e.g A nice cup"
            className="rounded-md p-2 max-h-56 min-h-56"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" className="bg-blue-500 mt-5 rounded-lg py-3 px-2 hover:bg-blue-300">
            Submit
          </button>
        
          </form>
    </div>
  );
}
export default ItemEntry