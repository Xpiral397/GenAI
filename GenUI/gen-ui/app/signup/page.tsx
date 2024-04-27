"use client";
import React, { useState } from "react";
import { UserPayLoad } from "../_api/auth/interface";
import { Signup } from "../_api/auth/siginin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function App() {
  const [formData, setFormData] = useState<UserPayLoad>({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // alert("yes")
    (async () => {
      const response = await Signup(formData);
      if (response === 200) {
        toast.success(
          "You have successfully created your account, we've send you a verification link to your email",
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
        setTimeout(() => {
          router.push("/signin");
        }, 5000);
      } else {
        toast.error(
          "Unable to create your account you credential was either not valid nor already validated",
          {
            position: "bottom-right",
            autoClose: 5000,
          }
        );
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark text-center text-secondary-500">
          Create Account On X-GenAI
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-light"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-light"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-light"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-light"
              required
            />
          </div> */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-primary-dark text-white py-2 rounded-md hover:bg-purple-500 bg-primary-500 focus:outline-none focus:ring focus:ring-primary-light"
          >
            Sign In
          </button>
        </form>
        <h1 className="mt-10 text-secondary-500 text-center text-sm ">
          Already have Account:
          <a href="/signin" className="ml-1 mx-2 ">
            Log in here
          </a>
        </h1>
      </div>
    </div>
  );
}

export default App;
