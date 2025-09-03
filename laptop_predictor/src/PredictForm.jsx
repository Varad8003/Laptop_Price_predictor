import { useState } from "react";
import axios from "axios";

export default function LaptopPredictor() {
  const [form, setForm] = useState({
    Company: "Dell",
    TypeName: "Notebook",
    Ram: 8,
    Weight: 1.5,
    TouchScreen: 0,
    IPS: 0,
    ScreenSize: 13.0,
    Resolution: "1920x1080",
    "Cpu brand": "Intel Core i5",
    HDD: 0,
    SSD: 512,
    "Gpu brand": "Intel",
    os: "Windows",
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["Ram", "Weight", "TouchScreen", "IPS", "ScreenSize", "HDD", "SSD"];
    setForm({
      ...form,
      [name]: numericFields.includes(name) ? Number(value) : value,
    });
  };

  // Compute PPI (pixels per inch)
  const computePPI = () => {
    const [xRes, yRes] = form.Resolution.split("x").map(Number);
    return Math.sqrt(xRes ** 2 + yRes ** 2) / parseFloat(form.ScreenSize);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrice(null);

    try {
      const payload = {
        Company: form.Company,
        TypeName: form.TypeName,
        Ram: form.Ram,
        Weight: form.Weight,
        TouchScreen: form.TouchScreen,
        IPS: form.IPS,
        ppi: computePPI(), 
        "Cpu brand": form["Cpu brand"],
        HDD: form.HDD,
        SSD: form.SSD,
        "Gpu brand": form["Gpu brand"],
        os: form.os,
      };

      const res = await axios.post("http://127.0.0.1:5000/predict", payload);
      setPrice(res.data.predicted_price);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Failed to fetch prediction. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Laptop Price Predictor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Brand */}
        <div>
          <label className="block mb-1 font-semibold">Brand</label>
          <select name="Company" value={form.Company} onChange={handleChange} className="w-full border rounded p-2">
            <option>Dell</option>
            <option>HP</option>
            <option>Lenovo</option>
            <option>Apple</option>
            <option>Acer</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-semibold">Type</label>
          <select name="TypeName" value={form.TypeName} onChange={handleChange} className="w-full border rounded p-2">
            <option>Notebook</option>
            <option>Ultrabook</option>
            <option>Gaming</option>
            <option>2 in 1 Convertible</option>
          </select>
        </div>

        {/* RAM */}
        <div>
          <label className="block mb-1 font-semibold">RAM (GB)</label>
          <select name="Ram" value={form.Ram} onChange={handleChange} className="w-full border rounded p-2">
            {[2, 4, 6, 8, 12, 16, 24, 32, 64].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-semibold">Weight (kg)</label>
          <input type="number" step="0.1" name="Weight" value={form.Weight} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        {/* Touchscreen */}
        <div>
          <label className="block mb-1 font-semibold">Touchscreen</label>
          <select name="TouchScreen" value={form.TouchScreen} onChange={handleChange} className="w-full border rounded p-2">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* IPS */}
        <div>
          <label className="block mb-1 font-semibold">IPS</label>
          <select name="IPS" value={form.IPS} onChange={handleChange} className="w-full border rounded p-2">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        {/* Screen Size */}
        <div>
          <label className="block mb-1 font-semibold">Screen Size (inches)</label>
          <input type="number" step="0.1" name="ScreenSize" value={form.ScreenSize} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        {/* Resolution */}
        <div>
          <label className="block mb-1 font-semibold">Resolution</label>
          <select name="Resolution" value={form.Resolution} onChange={handleChange} className="w-full border rounded p-2">
            {[
              "1920x1080","1366x768","1600x900","3840x2160",
              "3200x1800","2880x1800","2560x1600","2560x1440","2304x1440"
            ].map((res) => (
              <option key={res}>{res}</option>
            ))}
          </select>
        </div>

        {/* CPU */}
        <div>
          <label className="block mb-1 font-semibold">CPU</label>
          <select name="Cpu brand" value={form["Cpu brand"]} onChange={handleChange} className="w-full border rounded p-2">
            <option>Intel Core i3</option>
            <option>Intel Core i5</option>
            <option>Intel Core i7</option>
            <option>AMD Processor</option>
            <option>Other Intel Processor</option>
          </select>
        </div>

        {/* HDD */}
        <div>
          <label className="block mb-1 font-semibold">HDD (GB)</label>
          <select name="HDD" value={form.HDD} onChange={handleChange} className="w-full border rounded p-2">
            {[0, 128, 256, 512, 1024, 2048].map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* SSD */}
        <div>
          <label className="block mb-1 font-semibold">SSD (GB)</label>
          <select name="SSD" value={form.SSD} onChange={handleChange} className="w-full border rounded p-2">
            {[0, 8, 128, 256, 512, 1024].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* GPU */}
        <div>
          <label className="block mb-1 font-semibold">GPU</label>
          <select name="Gpu brand" value={form["Gpu brand"]} onChange={handleChange} className="w-full border rounded p-2">
            <option>Intel</option>
            <option>Nvidia</option>
            <option>AMD </option>
          </select>
        </div>

        {/* OS */}
        <div>
          <label className="block mb-1 font-semibold">Operating System</label>
          <select name="os" value={form.os} onChange={handleChange} className="w-full border rounded p-2">
            <option>Windows</option>
            <option>Mac</option>
            <option>Linux</option>
            <option>Other/No OS/Linux</option>
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </div>
      </form>

      {price && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-green-600">
            Predicted Price: ₹{price.toLocaleString("en-IN")}
          </h2>
        </div>
      )}
    </div>
  );
}
