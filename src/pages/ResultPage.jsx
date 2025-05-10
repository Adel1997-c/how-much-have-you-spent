import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
            total: format(data.result.total),
            yearly: format(data.result.yearly),
            monthly: format(data.result.monthly),
          });
        } else {
          setError("⚠️ لا توجد نتيجة");
        }
      } catch (err) {
        console.error(err);
        setError("❌ حدث خطأ أثناء جلب النتيجة");
      }
    };

    fetchResult();
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-yellow-300">
        💰 نتيجة مصاريفك
      </h1>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : result ? (
        <div className="bg-gray-800 p-6 rounded shadow-lg text-lg text-center space-y-3 w-full max-w-md">
          <div>📊 <strong>المجموع:</strong> {result.total}</div>
          <div>📆 <strong>سنوياً:</strong> {result.yearly}</div>
          <div>📅 <strong>شهرياً:</strong> {result.monthly}</div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm mt-6">جاري التحميل...</div>
      )}
    </div>
  );
};

export default ResultPage;
