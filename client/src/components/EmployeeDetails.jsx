import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeFormData, setEmployeeFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    employeeImage: '',
    employerId: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    // Fetch employers
    const fetchEmployers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/employers');
        setEmployers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployers();
  }, []);
console.log(employers)
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

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employeeFormData.employeeName);
    formData.append('email', employeeFormData.employeeEmail);
    formData.append('image', employeeFormData.employeeImage);
    formData.append('employerId', employeeFormData.employerId);

    try {
      const response = await axios.post('http://localhost:5000/api/employees/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEmployees([...employees, response.data]);
      setEmployeeFormData({
        employeeName: '',
        employeeEmail: '',
        employeeImage: '',
        employerId: '',
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data.errors);
    }
  };
console.log(employeeFormData)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
            <div className="relative border rounded-md py-2 border-dashed h-40 cursor-pointer">
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
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="employerId">
              Employer
            </label>
            <select
              name="employerId"
              id="employerId"
              className="rounded-md p-2 w-full"
              value={employeeFormData.employerId}
              onChange={handleChange}
            >
              <option value="">Select Employer</option>
              {employers.map((employer) => (
                <option key={employer._id} value={employer._id} className='bg-blue-300'>
                  {employer.email}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white rounded-md p-2">
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
