import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage]=useState('')
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login',{ email: formData.email,
        password: formData.password,});
      setMessage('Signup successful!');
      localStorage.setItem('token', response.data.token);
  localStorage.setItem('email', response.data.email);
      navigate('/Dashboard')
  } catch (error) {
      setMessage(error.response.data.error);
      console.log(error)
  }
    console.log('Login data:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="p-4 border bg-gray-400 w-1/4 flex flex-col justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className='font-semibold text-red-800'>{message}</p>
        <p className="mt-4">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={()=>(navigate('/SignUp'))}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
