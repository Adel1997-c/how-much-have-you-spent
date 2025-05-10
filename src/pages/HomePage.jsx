import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [age, setAge] = useState("");
  const [dailySpend, setDailySpend] = useState("");
  const [coffee, setCoffee] = useState("");
  const [fastFood, setFastFood] = useState("");
  const [subscriptions, setSubscriptions] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const years = parseFloat(age || 0);
    const spend = parseFloat(dailySpend || 0) * 365 * years;
    const coffeeCost = parseFloat(coffee || 0) * 8 * 365 * years;
    const fastFoodCost = parseFloat(fastFood || 0) * 20 * 52 * years;
    const subCost = parseFloat(subscriptions || 0) * 30 * 12 * years;

    const total = spend + coffeeCost + fastFoodCost + subCost;
    const yearly = total / years || 0;
    const monthly = yearly / 12 || 0;

    if (total > 0) {
      setResult({
        total: total.toLocaleString("ar-EG") + " ريال",
        monthly: monthly.toLocaleString("ar-EG") + " ريال",
        yearly: yearly.toLocaleString("ar-EG") + " ريال",
      });
    } else {
      setResult(null);
    }
  }, [age, dailySpend, coffee, fastFood, subscriptions]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        احسب كم صرفت في حياتك
      </h1>

      <div className="w-full max-w-md space-y-4 text-right">
        <input type="number" placeholder="عمرك (بالسنوات)" className="w-full p-3 rounded bg-gray-800" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="number" placeholder="مصاريفك اليومية" className="w-full p-3 rounded bg-gray-800" value={dailySpend} onChange={(e) => setDailySpend(e.target.value)} />
        <input type="number" placeholder="عدد أكواب القهوة باليوم" className="w-full p-3 rounded bg-gray-800" value={coffee} onChange={(e) => setCoffee(e.target.value)} />
        <input type="number" placeholder="الوجبات السريعة بالأسبوع" className="w-full p-3 rounded bg-gray-800" value={fastFood} onChange={(e) => setFastFood(e.target.value)} />
        <input type="number" placeholder="عدد الاشتراكات الشهرية" className="w-full p-3 rounded bg-gray-800" value={subscriptions} onChange={(e) => setSubscriptions(e.target.value)} />

        {result && (
          <div className="bg-gray-800 p-4 rounded mt-6 text-center text-lg space-y-2">
            <div>📊 <strong>المجموع:</strong> {result.total}</div>
            <div>📆 <strong>سنوياً:</strong> {result.yearly}</div>
            <div>📅 <strong>شهرياً:</strong> {result.monthly}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
