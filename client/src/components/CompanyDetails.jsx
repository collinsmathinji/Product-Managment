import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyLogo: ''
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, companyLogo: file });
      setPreviewUrl(URL.createObjectURL(file));
      setErrors({ ...errors, companyLogo: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle company details submission here
    console.log('Company details:', formData);
    // Navigate to the employee details page
    navigate('/employees');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="p-4 border bg-gray-400 w-1/4 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Enter Company Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="e.g. Philips Corp"
              className="rounded-md p-2 w-full"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="companyAddress">
              Company Location
            </label>
            <input
              type="text"
              name="companyAddress"
              id="companyAddress"
              placeholder="e.g. Juba"
              className="rounded-md p-2 w-full"
              value={formData.companyAddress}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="companyLogo">
              Company Logo
            </label>
            <div className="relative border rounded-md py-2 border-dashed h-40  cursor-pointer">
              <input
                type="file"
                id="companyLogo"
                name="companyLogo"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 border-gray-700 text-sm hover:cursor-pointer"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Company Logo Preview"
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
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;
