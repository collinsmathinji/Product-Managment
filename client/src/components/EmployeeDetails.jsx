import React, { useState } from 'react';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeFormData, setEmployeeFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    employeeImage: ''
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeFormData({ ...employeeFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeFormData({ ...employeeFormData, employeeImage: file });
      setPreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, employeeImage: '' });
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    // Add new employee to the employees array
    setEmployees([...employees, employeeFormData]);
    // Reset the form
    setEmployeeFormData({
      employeeName: '',
      employeeEmail: '',
      employeeImage: ''
    });
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="p-4 border bg-gray-400 w-1/4 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Enter Employee Details</h1>
        <form onSubmit={handleAddEmployee}>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="employeeName">
              Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              id="employeeName"
              placeholder="e.g. John Doe"
              className="rounded-md p-2 w-full"
              value={employeeFormData.employeeName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="employeeEmail">
              Employee Email
            </label>
            <input
              type="email"
              name="employeeEmail"
              id="employeeEmail"
              placeholder="e.g. john@example.com"
              className="rounded-md p-2 w-full"
              value={employeeFormData.employeeEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="employeeImage">
              Employee Image
            </label>
            <div className="relative border rounded-md py-2 border-dashed h-40  cursor-pointer">
              <input
                type="file"
                id="employeeImage"
                name="employeeImage"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 border-gray-700 text-sm hover:cursor-pointer"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Employee Image Preview"
                  className="w-full h-full object-cover border-gray-700"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-2 text-sm">
                  <p className="">Drag your image here</p>
                  <p>
                    <span className="text-blue-600 cursor-pointer">Browse</span> file from your laptop
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2"
          >
            Add Employee
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Employee List</h2>
          <ul>
            {employees.map((employee, index) => (
              <li key={index} className="flex items-center mb-2">
                <img
                  src={URL.createObjectURL(employee.employeeImage)}
                  alt={employee.employeeName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span>{employee.employeeName}</span>
                <span className="ml-2">({employee.employeeEmail})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
