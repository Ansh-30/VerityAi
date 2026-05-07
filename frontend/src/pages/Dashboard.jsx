import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [article, setArticle] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===============================
  // LOAD HISTORY
  // ===============================
  const loadHistory = async () => {
    try {
      const res = await axios.get(
        "https://backend-l4f5.onrender.com/api/news/history"
      );

      setHistory(res.data || []);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // ===============================
  // ANALYZE NEWS
  // ===============================
  const handleAnalyze = async () => {
    if (!article.trim()) {
      alert("Please enter article text");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://backend-l4f5.onrender.com/api/news/predict",
        {
          text: article,
        }
      );

      setResults(res.data.results || []);

      loadHistory();

    } catch (err) {
      console.log(err);
      alert("Prediction failed");

    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // HELPERS
  // ===============================
  const isFake = (prediction) => {
    if (!prediction) return false;

    return (
      prediction.toString().toUpperCase().includes("FAKE") ||
      prediction.toString().toUpperCase().includes("LABEL_0")
    );
  };

  const formatConfidence = (confidence) => {
    if (!confidence) return "0";

    return Number(confidence).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            AI News Detector
          </h1>

          <button className="border border-red-500 text-red-500 px-4 py-2 rounded-full">
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 bg-[#111] p-6 rounded-2xl border border-gray-800">

            <h2 className="text-2xl font-bold mb-2">
              AI News Detector
            </h2>

            <p className="text-gray-400 mb-6">
              Paste any article and compare AI predictions.
            </p>

            {/* TEXTAREA */}
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Paste news article here..."
              className="w-full h-64 bg-black border border-gray-700 rounded-xl p-4 outline-none"
            />

            {/* BUTTON */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-6 border border-blue-500 text-white py-3 rounded-full hover:bg-blue-500 transition"
            >
              {loading ? "Analyzing..." : "Analyze News"}
            </button>

            {/* RESULTS */}
            {results.length > 0 && (
              <div className="mt-8 space-y-4">

                {results.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black border border-gray-700 p-4 rounded-xl"
                  >
                    <div className="flex justify-between items-center">

                      <div>
                        <h3 className="text-lg font-bold uppercase">
                          {item.model}
                        </h3>

                        <p
                          className={`font-semibold ${
                            isFake(
                              item.result?.prediction || item.prediction
                            )
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.result?.prediction || item.prediction}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-gray-400 text-sm">
                          Confidence
                        </p>

                        <p className="font-bold">
                          {formatConfidence(
                            item.result?.confidence || item.confidence
                          )}
                          %
                        </p>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* HISTORY */}
          <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              📝 History
            </h2>

            {history.length === 0 ? (
              <p className="text-gray-500">
                No history yet
              </p>

            ) : (

              <div className="space-y-4">

                {history.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black border border-gray-700 p-4 rounded-xl"
                  >
                    <p className="text-sm text-gray-300 mb-2 line-clamp-3">
                      {item.text}
                    </p>

                    <div className="flex justify-between items-center">

                      <span
                        className={`font-semibold ${
                          isFake(item.prediction)
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.prediction}
                      </span>

                      <span className="text-sm text-gray-400">
                        {formatConfidence(item.confidence)}%
                      </span>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;