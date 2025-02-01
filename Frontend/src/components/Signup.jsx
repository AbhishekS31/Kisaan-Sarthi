import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function SignUpPage() {
  const appearance = {
    baseTheme: 'light', // Options: 'light' or 'dark'
    layout: {
      socialButtonsVariant: 'icon', // Options: 'icon' or 'text'
    },
    elements: {
      formButtonPrimary: 'bg-blue-500 text-white hover:bg-blue-700', // Tailwind CSS classes
      formButtonSecondary: 'bg-gray-500 text-white hover:bg-gray-700',
      // Add more element customizations as needed
    },
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Sign In : </h2>
      <SignUp appearance={appearance}  />
    </div>
  );
}

export default SignUpPage;
