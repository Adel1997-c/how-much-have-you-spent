import React, { useState } from "react";

const HomePage = () => {
  const [age, setAge] = useState("");
  const [dailySpend, setDailySpend] = useState("");
  const [coffee, setCoffee] = useState("");
  const [fastFood, setFastFood] = useState("");
  const [subscriptions, setSubscriptions] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const years = parseFloat(age || 0);
    const spend = parseFloat(dailySpend || 0) * 365 * years;
    const coffeeCost = parseFloat(coffee || 0) * 8 * 365 * years;
    const fastFoodCost = parseFloat(fastFood || 0) * 20 * 52 * years;
    const subCost = parseFloat(subscriptions || 0) * 30 * 12 * years;

    const total = spend + coffeeCost + fastFoodCost + subCost;
    setResult(total.toLocaleString("ar-EG") + " ريال");
  };

  const reset = () => {
    setAge("");
    setDailySpend("");
    setCoffee("");
    setFastFood("");
    setSubscriptions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold text-center text-yellow-400">
        احسب كم صرفت في حياتك؟
      </h1>

      <div className="w-full max-w-md space-y-4 text-right">
        <input
          type="number"
          placeholder="عمرك (بالسنوات)"
          className="w-full p-3 rounded bg-gray-800 text-white"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="كم تصرف يوميًا؟"
          className="w-full p-3 rounded bg-gray-800 text-white"
          value={dailySpend}
          onChange={(e) => setDailySpend(e.target.value)}
        />
        <input
          type="number"
          placeholder="كم كوب قهوة يوميًا؟"
          className="w-full p-3 rounded bg-gray-800 text-white"
          value={coffee}
          onChange={(e) => setCoffee(e.target.value)}
        />
        <input
          type="number"
          placeholder="كم وجبة سريعة بالأسبوع؟"
          className="w-full p-3 rounded bg-gray-800 text-white"
          value={fastFood}
          onChange={(e) => setFastFood(e.target.value)}
        />
        <input
          type="number"
          placeholder="كم اشتراك شهري (مثل نتفليكس)؟"
          className="w-full p-3 rounded bg-gray-800 text-white"
          value={subscriptions}
          onChange={(e) => setSubscriptions(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            className="w-full p-3 bg-green-600 rounded hover:bg-green-700 transition"
            onClick={calculate}
          >
            احسب الآن
          </button>
          <button
            className="w-full p-3 bg-red-600 rounded hover:bg-red-700 transition"
            onClick={reset}
          >
            إعادة تعيين
          </button>
        </div>

        <div className="mt-6 text-center text-2xl font-bold text-yellow-300">
          {result ? (
            <>أنت صرفت تقريبًا: {result}</>
          ) : (
            <>ابدأ بتعبئة البيانات لحساب مصاريفك!</>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
