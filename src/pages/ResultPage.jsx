import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const ref = doc(db, "results", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const format = (val) =>
            parseFloat(val).toLocaleString("ar-EG") + " ريال";
          setResult({
            total: format(data.total),
            yearly: format(data.yearly),
            monthly: format(data.monthly),
          });
        } else {
          setResult("not-found");
        }
      } catch (err) {
        console.error(err);
        setResult("error");
      }
    };

    fetchResult();
  }, [id]);

  const handleCopy = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (result === "not-found") {
    return <div className="text-center text-red-500 mt-10">⚠️ لا توجد نتيجة</div>;
  }

  if (result === "error") {
    return <div className="text-center text-red-600 mt-10">❌ خطأ في تحميل النتيجة</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-yellow-300">
        💰 نتيجة مصاريفك
      </h1>

      {result ? (
        <div className="bg-gray-800 p-6 rounded shadow-lg text-lg text-center space-y-3 w-full max-w-md">
          <div>📊 <strong>المجموع:</strong> {result.total}</div>
          <div>📆 <strong>سنوياً:</strong> {result.yearly}</div>
          <div>📅 <strong>شهرياً:</strong> {result.monthly}</div>

          <button
            onClick={handleCopy}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white w-full"
          >
            {copied ? "✅ تم نسخ الرابط" : "📋 انسخ الرابط"}
          </button>
        </div>
      ) : (
        <div className="text-gray-400 text-sm mt-6">جاري التحميل...</div>
      )}
    </div>
  );
};

export default ResultPage;
