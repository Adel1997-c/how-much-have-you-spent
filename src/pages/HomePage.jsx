import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const funnyFacts = [
  "كان ممكن تشتري فيها 300 شاورما!",
  "تقدر تعبي بنزين لمدة سنة كاملة!",
  "هذه مصاريف تكفي تسافر لأوروبا مرتين!",
  "لو وفرتها، كنت اشتريت آيفون كل سنة!",
  "كان ممكن تسوي فيها عرس أسطوري!",
  "كان ممكن تسكن في فندق 5 نجوم شهر كامل!",
  "كان ممكن تفتح محل عصيرات!",
  "هذه الفلوس تسويك مليونير في لعبة مونوبولي!",
  "تقدر تشتري فيها 1000 كوب قهوة!",
  "لو كل يوم ريال، كان معك 365 ريال بس!",
  "هل كنت محتاج فعلاً كل هذه الأشياء؟",
  "كان ممكن تسوي عملية زراعة شعر!",
  "أنت رسمياً ملك الصرف!",
  "تستاهل جائزة أكثر شخص صرف!",
  "لو كل ريال وفّرته، كنت ارتحت نفسياً!",
  "نصيحة: افتح دفتر توفير بسرعة!",
  "كان ممكن تشتري ببسي لكل أهل الحارة!",
  "تقدر تشتري فيها خروف سمين في العيد!",
  "هذا الرقم يخوف! راجع حساباتك!",
  "وين راحت كل هالفلوس؟!",
  // Add up to 100 total...
];

const HomePage = () => {
  const [age, setAge] = useState("");
  const [dailyExpenses, setDailyExpenses] = useState([""]);
  const [coffees, setCoffees] = useState([""]);
  const [fastFoods, setFastFoods] = useState([""]);
  const [subscriptions, setSubscriptions] = useState([""]);
  const [result, setResult] = useState(null);
  const [funny, setFunny] = useState("");

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
    const sum = (arr) =>
      arr.reduce((a, b) => a + (parseFloat(b) || 0), 0);

    const total =
      sum(dailyExpenses) * 365 * years +
      sum(coffees) * 8 * 365 * years +
      sum(fastFoods) * 20 * 52 * years +
      sum(subscriptions) * 12 * years;

    const yearly = total / years || 0;
    const monthly = yearly / 12 || 0;

    if (total > 0) {
      const fact = funnyFacts[Math.floor(Math.random() * funnyFacts.length)];
      setResult({
        total: total.toLocaleString("ar-EG") + " ريال",
        yearly: yearly.toLocaleString("ar-EG") + " ريال",
        monthly: monthly.toLocaleString("ar-EG") + " ريال",
      });
      setFunny(fact);
    } else {
      setResult(null);
      setFunny("");
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

        {renderInputGroup("🕐 مصاريفك اليومية", dailyExpenses, setDailyExpenses, "ريال", "مصاريف")}
        {renderInputGroup("☕ عدد أكواب القهوة", coffees, setCoffees, "أكواب", "قهوة")}
        {renderInputGroup("🍔 وجبات سريعة أسبوعياً", fastFoods, setFastFoods, "وجبات", "وجبة")}
        {renderInputGroup("📺 الاشتراكات الشهرية", subscriptions, setSubscriptions, "ريال", "اشتراك")}

        <button
          className="w-full p-3 mt-4 bg-green-600 rounded hover:bg-green-700"
          onClick={calculate}
        >احسب الآن</button>

        {result && (
          <div className="bg-gray-800 p-4 rounded mt-6 text-center text-lg space-y-2">
            <div>📊 <strong>المجموع:</strong> {result.total}</div>
            <div>📆 <strong>سنوياً:</strong> {result.yearly}</div>
            <div>📅 <strong>شهرياً:</strong> {result.monthly}</div>
            <div className="mt-2 text-yellow-400">😂 {funny}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
