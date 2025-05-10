import React, { useState } from "react";

const translations = {
  ar: {
    title: "احسب كم صرفت في حياتك",
    agePlaceholder: "عمرك (بالسنوات)",
    dailyTitle: "🕐 مصاريفك اليومية التقريبية",
    coffeeTitle: "☕ القهوة اليومية التقريبية",
    fastFoodTitle: "🍔 الوجبات السريعة الأسبوعية التقريبية",
    subsTitle: "📺 الاشتراكات الشهرية التقريبية",
    calcBtn: "احسب الآن",
    resultTitle: "📊 المجموع:",
    yearly: "📆 سنوياً:",
    monthly: "📅 شهرياً:",
    addMore: "+ إضافة أخرى",
    label: "ريال",
    toggleLang: "English",
  },
  en: {
    title: "How Much Have You Spent in Your Life?",
    agePlaceholder: "Your age (in years)",
    dailyTitle: "🕐 Daily approximate spending",
    coffeeTitle: "☕ Daily coffee cups",
    fastFoodTitle: "🍔 Weekly fast food meals",
    subsTitle: "📺 Monthly subscriptions",
    calcBtn: "Calculate Now",
    resultTitle: "📊 Total:",
    yearly: "📆 Yearly:",
    monthly: "📅 Monthly:",
    addMore: "+ Add More",
    label: "SAR",
    toggleLang: "العربية",
  },
};

const HomePage = () => {
  const [lang, setLang] = useState("ar");
  const [age, setAge] = useState("");
  const [dailyExpenses, setDailyExpenses] = useState([0]);
  const [coffees, setCoffees] = useState([0]);
  const [fastFoods, setFastFoods] = useState([0]);
  const [subscriptions, setSubscriptions] = useState([0]);
  const [result, setResult] = useState(null);

  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  const handleAdd = (setter, state) => setter([...state, 0]);
  const handleRemove = (setter, state, index) => {
    if (state.length > 1) {
      const updated = [...state];
      updated.splice(index, 1);
      setter(updated);
    }
  };
  const handleChange = (setter, state, index, value) => {
    const updated = [...state];
    updated[index] = parseFloat(value) || 0;
    setter(updated);
  };

  const calculate = () => {
    const years = parseFloat(age || 0);
    const totalDaily = dailyExpenses.reduce((a, b) => a + b, 0) * 365 * years;
    const totalCoffee = coffees.reduce((a, b) => a + b, 0) * 8 * 365 * years;
    const totalFastFood = fastFoods.reduce((a, b) => a + b, 0) * 20 * 52 * years;
    const totalSubs = subscriptions.reduce((a, b) => a + b, 0) * 12 * years;

    const total = totalDaily + totalCoffee + totalFastFood + totalSubs;
    const yearly = total / years || 0;
    const monthly = yearly / 12 || 0;

    if (total > 0) {
      setResult({ total, yearly, monthly });
    } else {
      setResult(null);
    }
  };

  const renderInputGroup = (title, values, setter) => (
    <div className="mb-4">
      <h2 className="font-semibold mb-2 text-yellow-400">{title}</h2>
      {values.map((val, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            type="number"
            className="flex-1 p-2 rounded bg-gray-800 text-white"
            placeholder={t.label}
            value={val}
            onChange={(e) => handleChange(setter, values, i, e.target.value)}
            dir={dir}
          />
          <button
            onClick={() => handleRemove(setter, values, i)}
            className="bg-red-600 px-3 rounded hover:bg-red-700"
          >✕</button>
        </div>
      ))}
      <button onClick={() => handleAdd(setter, values)} className="text-sm text-blue-400 hover:underline">
        {t.addMore}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center" dir={dir}>
      <button
        onClick={() => setLang(lang === "ar" ? "en" : "ar")}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-700 rounded"
      >
        {t.toggleLang}
      </button>

      <h1 className="text-3xl font-bold mb-6 text-yellow-300 text-center">{t.title}</h1>

      <div className="w-full max-w-md">
        <input
          type="number"
          placeholder={t.agePlaceholder}
          className="w-full p-3 rounded bg-gray-800 mb-4"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {renderInputGroup(t.dailyTitle, dailyExpenses, setDailyExpenses)}
        {renderInputGroup(t.coffeeTitle, coffees, setCoffees)}
        {renderInputGroup(t.fastFoodTitle, fastFoods, setFastFoods)}
        {renderInputGroup(t.subsTitle, subscriptions, setSubscriptions)}

        <button
          onClick={calculate}
          className="w-full p-3 mt-4 bg-green-600 rounded hover:bg-green-700"
        >
          {t.calcBtn}
        </button>

        {result && (
          <div className="bg-gray-800 p-4 rounded mt-6 text-center text-lg space-y-2">
            <div>{t.resultTitle} {result.total.toLocaleString("en-US")} {t.label}</div>
            <div>{t.yearly} {result.yearly.toLocaleString("en-US")} {t.label}</div>
            <div>{t.monthly} {result.monthly.toLocaleString("en-US")} {t.label}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
