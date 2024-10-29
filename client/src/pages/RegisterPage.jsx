import React, { useState } from 'react';
import { MessageSquare, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import customFetch from '../utils/CustomFetch';
import { toast } from 'react-toastify';
import { Form, redirect } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    registerNo: '',
    department: '',
    email: '',
    password: '',
    mobileNo: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setFocusedField(name); // Set the focused field when input changes
  };

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'AI'];

  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#D1D6FE]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full animate-pulse">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Join Us!</h2>
        <Form method='post' className="space-y-4">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Name"
              onFocus={() => setFocusedField('name')}
             
            />
            <label
              htmlFor="name"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'name' || formData.name
                  ? '-top-3.5 text-sm text-blue-500'
                  : 'top-2 text-base'
                }`}
            >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="registerNo"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Register Number"
              onFocus={() => setFocusedField('registerNo')}
          
            />
            <label
              htmlFor="registerNo"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'registerNo' || formData.registerNo
                  ? '-top-3.5 text-sm text-blue-500'
                  : 'top-2 text-base'
                }`}
            >
              Register Number
            </label>
          </div>
          <div className="relative">
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 bg-white transition-all duration-300"
              onFocus={() => setFocusedField('department')}
           
            >
              <option value="" disabled>
              </option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <label
              htmlFor="department"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'department' || formData.department
                  ? '-top-3.5 text-sm text-blue-500'
                  : 'top-2 text-base'
                }`}
            >
              Department
            </label>
          </div>
          <div className="relative">
            <input
              type="tel"
              id="phoneNumber"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Phone Number"
              onFocus={() => setFocusedField('mobileNo')}
         
            />
            <label
              htmlFor="phoneNumber"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'mobileNo' || formData.mobileNo
                ? '-top-3.5 text-sm text-blue-500'
                : 'top-2 text-base'
                }`}
            >
              Phone Number
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Email"
              onFocus={() => setFocusedField('email')}
         
            />
            <label
              htmlFor="email"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'email' || formData.email
                  ? '-top-3.5 text-sm text-blue-500'
                  : 'top-2 text-base'
                }`}
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Password"
              onFocus={() => setFocusedField('password')}
  
            />
            <label
              htmlFor="password"
              className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 ${focusedField === 'password' || formData.password
                  ? '-top-3.5 text-sm text-blue-500'
                  : 'top-2 text-base'
                }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
       
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            Register
            <ArrowRight className="inline-block ml-2" size={20} />
          </button>
        </Form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:underline flex items-center justify-center">
            <MessageSquare className="mr-2" size={20} />
            Already have an account? Login here
          </a>
        </div>
      </div>
    </div>
  );
}

// action for submitting register form 
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/Login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};