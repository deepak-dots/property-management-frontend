// pages/user/login.jsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //  Call AuthContext login which handles guest favorites sync
      await login(data.email, data.password);

      // Redirect to dashboard page after successful login
      router.push('/user/dashboard'); 
    } catch (err) {
      setError('apiError', {
        message: err.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">User Login</h2>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password required',
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        {/* API Error */}
        {errors.apiError && <p className="text-red-500">{errors.apiError.message}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {/* Links */}
        <p className="text-sm text-center text-gray-600 mt-2">
          Forgot your password?{' '}
          <a href="/user/forgot-password" className="text-blue-600 hover:underline">
            Reset here
          </a>
        </p>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don't have an account?{' '}
          <a href="/user/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
