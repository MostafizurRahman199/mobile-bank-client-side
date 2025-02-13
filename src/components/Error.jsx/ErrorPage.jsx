import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ errorMessage = "Something went wrong. Please try again later!" }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Oops! {errorMessage}
        </h2>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or an error occurred.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
