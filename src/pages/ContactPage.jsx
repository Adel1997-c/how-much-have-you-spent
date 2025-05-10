import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-300 mb-4">Contact Us</h1>
      <p className="mb-3">For questions, feedback, or inquiries, feel free to reach out:</p>
      <p className="mb-2">📧 Email: <a href="mailto:support@example.com" className="text-blue-400 underline">support@example.com</a></p>
    </div>
  );
};

export default ContactPage;
