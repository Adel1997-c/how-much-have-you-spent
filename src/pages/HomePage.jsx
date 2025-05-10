import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [age, setAge] = useState("");
  const [dailyExpenses, setDailyExpenses] = useState([""]);
  const [coffees, setCoffees] = useState([""]);
  const [fastFoods, setFastFoods] = useState([""]);
  const [subscriptions, setSubscriptions] = useState([""]);
  const [result, setResult] = useState(null);

  const handleAdd = (setter, state) => setter([...state, ""]);

  const handleRemove = (setter, state, index) => {
    if (state.length > 1) {
      const updated = [...state];
      updated.splice(index, 1);
      setter(updated);
    }
  };

  const handleChange = (setter, state, index, value) => {
    const updated = [...state];
    updated[index] = value;
    setter(updated);
  };

  const calculate = () => {
    const years = parseFloat(age || 0);
    const totalDaily = dailyExpenses.reduce((a, b) => a + (parseFloat(b) || 0), 0) * 365 * years;
    const totalCoffee = coffees.reduce((a, b) => a + (parseFloat(b) || 0), 0) * 8 * 365 * years;
    const totalFastFood = fastFoods.reduce((a, b) => a + (parseFloat(b) || 0), 0) * 20 * 52 * years;
    const totalSubs = subscriptions.reduce((a, b) => a + (parseFloat(b) || 0), 0) * 12 * years;

    const total = totalDaily + totalCoffee + totalFastFood + totalSubs;
    const yearly = total / years || 0;
    const monthly = yearly / 12 || 0;

    if (total > 0) {
      setResult({ total, yearly, monthly });
    } else {
      setResult(null);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const id = uuidv4();
    try {
      await setDoc(doc(db, "results", id), {
        result: {
          total: result.total,
          yearly: result.yearly,
          monthly: result.monthly,
        },
      });
      const link = `${window.location.origin}/result/${id}`;
      navigator.clipboard.writeText(link);
      alert(`✅ تم نسخ الرابط للمشاركة:\n\n${link}`);
    } catch (error) {
      alert("❌ حدث خطأ أثناء الحفظ والمشاركة");
      console.error(error);
    }
  };

  const renderInputGroup = (title, values, setter, unit, label) => (
    <div className="mb-4">
      <h2 className="text-right font-semibold mb-2 text-yellow-400">{title}</h2>
      {values.map((val, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            type="number"
            className="flex-1 p-2 rounded bg-gray-800 text-white text-right"
            placeholder={`${label} (${unit})`}
            value={val}
            onChange={(e) => handleChange(setter, values, i, e.target.value)}
          />
          <button
            onClick={() => handleRemove(setter, values, i)}
            className="bg-red-600 px-3 rounded hover:bg-red-700"
          >✕</button>
        </div>
      ))}
      <button onClick={() => handleAdd(setter, values)} className="text-sm text-blue-400 hover:underline">
        + إضافة أخرى
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">احسب كم صرفت في حياتك</h1>

      <div className="w-full max-w-md text-right">
        <input
          type="number"
          placeholder="عمرك (بالسنوات)"
          className="w-full p-3 rounded bg-gray-800 mb-4"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {renderInputGroup("🕐 مصاريفك اليومية التقريبية", dailyExpenses, setDailyExpenses, "ريال", "مصاريف")}
        {renderInputGroup("☕ القهوة اليومية التقريبية", coffees, setCoffees, "أكواب", "قهوة")}
        {renderInputGroup("🍔 الوجبات السريعة الأسبوعية التقريبية", fastFoods, setFastFoods, "وجبات", "وجبة")}
        {renderInputGroup("📺 الاشتراكات الشهرية التقريبية", subscriptions, setSubscriptions, "ريال", "اشتراك")}

        <button onClick={calculate} className="w-full p-3 mt-4 bg-green-600 rounded hover:bg-green-700">
          احسب الآن
        </button>

        {result && (
          <div className="bg-gray-800 p-4 rounded mt-6 text-center text-lg space-y-2">
            <div>📊 <strong>المجموع:</strong> {result.total.toLocaleString("ar-EG")} ريال</div>
            <div>📆 <strong>سنوياً:</strong> {result.yearly.toLocaleString("ar-EG")} ريال</div>
            <div>📅 <strong>شهرياً:</strong> {result.monthly.toLocaleString("ar-EG")} ريال</div>
          </div>
        )}

        {result && (
          <button onClick={handleShare} className="w-full mt-4 p-3 bg-blue-600 rounded hover:bg-blue-700 transition">
            📤 مشاركة النتيجة
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
