import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    navigate('/company')
    console.log('Sign up data:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 border bg-gray-400 w-1/4 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. John Doe"
              className="rounded-md p-2 w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g. example@example.com"
              className="rounded-md p-2 w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              className="rounded-md p-2 w-full"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md p-2"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={onToggle}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
