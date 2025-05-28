// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 mb-3">404 - Page Not Found</h1>
      <p className="mb-4">The page you requested does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
