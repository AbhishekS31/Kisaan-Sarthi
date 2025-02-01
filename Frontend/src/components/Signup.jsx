import React, { useState } from 'react';
import { SignUp, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

function SignUpPage() {
  const { clerk } = useClerk(); // Clerk instance to update user metadata
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation after success

  const appearance = {
    baseTheme: 'light',
    layout: {
      socialButtonsVariant: 'icon',
    },
    elements: {
      formButtonPrimary: 'bg-blue-500 text-white hover:bg-blue-700',
      formButtonSecondary: 'bg-gray-500 text-white hover:bg-gray-700',
    },
  };

  // Handle the additional farmer info submission
  const handleAdditionalInfoSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !age || !state) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Update user metadata in Clerk
      await clerk.users.updateUserMetadata(clerk.user.id, {
        fullName,
        age,
        state,
      });

      // Redirect to a new page (e.g., dashboard)
      navigate('/dashboard'); // Updated navigation method
    } catch (err) {
      console.error('Error saving metadata:', err);
      setError('Failed to save your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Sign Up for Farming Portal</h2>

      {/* SignUp Clerk Component */}
      <SignUp appearance={appearance} />

      {/* Farmer's Basic Information Form */}
      <div className="mt-8 w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Farmer Details</h3>
        <form onSubmit={handleAdditionalInfoSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your age"
              min="18"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select your state</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              {/* Add more states as needed */}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Submit Details'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
