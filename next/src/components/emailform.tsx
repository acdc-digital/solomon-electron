// src/app/components/EmailForm.tsx
import React, { useState } from 'react';

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      setEmail(''); // Clear the form
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#333333] p-3">
      <p className="text-white mb-4">
        Need help? Email:
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center">
        <input
          type="email"
          name="email"
          id="email"
          required
          className="flex-1 px-4 py-2 text-black bg-white rounded-l-lg shadow"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <button type="submit" className="px-6 py-2 bg-black text-white rounded-r-lg shadow hover:bg-opacity-90">
          Subscribe
        </button>
      </form>
      <p className="text-gray-100 mt-6 mb-6 text-sm">
        Feel free to submit your email and a customer representative will be in touch to assist with any of your needs.
      </p>
    </div>
  );
};

export default EmailForm;