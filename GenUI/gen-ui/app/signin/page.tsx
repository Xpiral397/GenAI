// Login.js
"use client";
import React, { useState } from "react";
import Login from "../_api/auth/login";
import { LoginPayLoad } from "../_api/auth/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

export default function LoginJSX() {
  const [formData, setFormData] = useState<LoginPayLoad>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    // Implement authentication logic here (e.g., API call to verify credentials)
    console.log("Login data:", formData);
    // Reset form fields after submission
    (async () => {
      const response = await Login(formData);
      if (response == 200) {
        setLoading(false);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/mathai");
        }, 3000);
      } else {
        setLoading(false);
        toast.error("Invalid Credential", { position: "top-right" });
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-primary-dark text-center text-secondary-500">
          Login to X-GenAI
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
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
          <Button
            isLoading={loading}
            type="submit"
            className="w-full bg-primary-dark text-white py-2 rounded-md hover:bg-primary-600 bg-primary-500 focus:outline-none focus:ring focus:ring-primary-light"
          >
            Sign In
          </Button>
        </form>
        <h1 className="mt-4 text-secondary-500 text-center text-sm ">
          Do't have Account:<a href="/signup">Signup here</a>
        </h1>
      </div>
    </div>
  );
}
