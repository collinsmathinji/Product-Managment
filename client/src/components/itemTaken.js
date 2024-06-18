import React, { useState } from 'react';
import axios from 'axios';

const ItemTaken = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    items: [{ itemId: '', quantityTaken: 0 }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({ ...formData, items });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, { itemId: '', quantityTaken: 0 }] });
  };

  const handleRemoveItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/transactions/take', formData);
      // Handle success (e.g., show a success message or clear the form)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 border bg-gray-400 w-1/4 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Take Items</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              id="employeeId"
              placeholder="e.g. 60c72b2f9f1b2c001c8e4e8b"
              className="rounded-md p-2 w-full"
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            />
          </div>
          {formData.items.map((item, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 text-sm" htmlFor={`itemId-${index}`}>
                Item ID
              </label>
              <input
                type="text"
                name="itemId"
                id={`itemId-${index}`}
                placeholder="e.g. 60c72b2f9f1b2c001c8e4e8b"
                className="rounded-md p-2 w-full"
                value={item.itemId}
                onChange={(e) => handleChange(e, index)}
              />
              <label className="block mb-2 text-sm" htmlFor={`quantityTaken-${index}`}>
                Quantity Taken
              </label>
              <input
                type="number"
                name="quantityTaken"
                id={`quantityTaken-${index}`}
                placeholder="e.g. 10"
                className="rounded-md p-2 w-full"
                value={item.quantityTaken}
                onChange={(e) => handleChange(e, index)}
              />
              <button type="button" className="text-red-600 mt-2" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="bg-green-600 text-white rounded-md p-2 mb-4" onClick={handleAddItem}>
            Add Item
          </button>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-md p-2">
            Record Items Taken
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemTaken;
