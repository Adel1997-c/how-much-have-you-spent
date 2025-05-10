import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-300 mb-4">Privacy Policy</h1>
      <p className="mb-3">We value your privacy. This website does not collect personal information, nor does it store any data entered by users, except when generating a shareable link.</p>
      <p className="mb-3">All calculations are processed on the client-side and remain confidential unless you explicitly choose to share your result.</p>
      <p>We may use cookies or analytics to track basic usage data (e.g., page visits), but this does not include any personal data.</p>
    </div>
  );
};

export default PrivacyPolicy;
