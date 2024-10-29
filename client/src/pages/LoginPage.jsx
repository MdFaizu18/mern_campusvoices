import React, { useState } from 'react';
import { Form, useNavigation, redirect } from 'react-router-dom'
import { MessageSquare, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import customFetch from '../utils/CustomFetch';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    registerNo: '',
    password: ''
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

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1D6FE]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full animate-pulse">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back!</h2>
        <Form method="post" className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
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
              type="text"
              id="registerNo"
              name="registerNo"
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Register Number"
              value={formData.registerNo}
              onChange={handleChange}
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
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="peer w-full px-3 py-2 border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 placeholder-transparent transition-all duration-300"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="inline-block ml-2" size={20} />
              </>
            )}
          </button>
        </Form>
        <div className="mt-6 text-center" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <a href="/register" className="text-blue-600 hover:underline flex items-center justify-center">
            <UserPlus className="mr-2" size={20} />
            New user? Register
          </a>
          <a href="/redirect/forget-password" className="text-blue-600 hover:underline flex items-center justify-center">
            {/* <UserPlus className="mr-2" size={20} /> */}
            Forget Password
          </a>
        </div>

      </div>
    </div>
  );
}

// action for submitting form 
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const userEmail = data.email;

  try {
    // Fetch user details
    const userDetails = await customFetch.get(`/users/dashboard-admin/${userEmail}`);
    const userRole = userDetails.data?.user?.role;

    // Attempt to log in
    await customFetch.post("/auth/login", data);

    // Set cookie for 7 days
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);
    Cookies.set('tokens', userEmail, { path: '/', expires: expireDate });

    // Verify if the cookie was set
    if (!Cookies.get('tokens')) {
      toast.error("This site requires cookies to function properly. Please enable cookies in your browser settings.");
      return errors;
    }

    // Show success and redirect based on user role
    toast.success("Login Successful");
    return redirect(
      userRole === "admin" ? "/admin-dashboard" : "/student-dashboard"
    );
  } catch (error) {
    toast.error(error?.response?.data?.msg || "An error occurred. Please try again.");
    return error;
  }
};
