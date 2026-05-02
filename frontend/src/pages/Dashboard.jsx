import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Dashboard() {
  const [article, setArticle] = useState("");
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  // ----------------------------------
  // LOAD HISTORY
  // ----------------------------------
  const loadHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/history");
      setHistory(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ----------------------------------
  // ANALYZE NEWS
  // ----------------------------------
  const handlePredict = async (e) => {
    e.preventDefault();

    if (!article.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        text: article,
      });

      setResults(res.data.results || []);

      setPopupData({
        text: article,
        results: res.data.results || [],
      });

      setPopupOpen(true);

      loadHistory();
    } catch (err) {
      alert("Prediction failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // OPEN HISTORY POPUP
  // ----------------------------------
  const openHistoryPopup = async (item) => {
    setPopupData({
      text: item.text,
      results: [
        {
          model: "Final Verdict",
          prediction: item.prediction,
          confidence: item.confidence,
        },
      ],
    });

    setPopupOpen(true);
  };

  // ----------------------------------
  // HELPERS
  // ----------------------------------
  const isFake = (prediction = "") =>
    prediction.toLowerCase().includes("fake");

  const formatConfidence = (value) => {
    const num = Number(value);
    if (isNaN(num)) return "0.00%";
    return `${num.toFixed(2)}%`;
  };

  const getColor = (prediction = "") =>
    isFake(prediction)
      ? "text-red-400 border-red-500/40"
      : "text-green-400 border-green-500/40";

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-3 space-y-8">

            {/* INPUT CARD */}
            <Card className="p-8 bg-zinc-950 border border-white/10 rounded-3xl">
              <h1 className="text-4xl font-bold mb-3">AI News Detector</h1>

              <p className="text-gray-400 mb-6">
                Paste any article and compare AI predictions.
              </p>

              <form onSubmit={handlePredict} className="space-y-5">
                <textarea
                  rows={10}
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  placeholder="Paste article here..."
                  className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white resize-none focus:outline-none focus:border-blue-500"
                />

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "🔄 Analyzing..." : "Analyze News"}
                </Button>
              </form>
            </Card>

            {/* LIVE RESULT CARDS */}
            {results.length > 0 && (
              <>
                <h2 className="text-2xl font-bold">Model Predictions</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {results.map((item, index) => (
                    <Card
                      key={index}
                      className="p-6 rounded-3xl border border-white/10 bg-zinc-950"
                    >
                      <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl font-bold">{item.model}</h3>

                        <span className="text-3xl">
                          {isFake(item.prediction) ? "❌" : "✅"}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/40 flex justify-between">
                          <span className="text-gray-400">Prediction</span>

                          <span
                            className={`font-bold ${getColor(
                              item.prediction
                            )}`}
                          >
                            {item.prediction}
                          </span>
                        </div>

                        <div className="p-4 rounded-xl bg-black/40 flex justify-between">
                          <span className="text-gray-400">Confidence</span>

                          <span className="text-blue-400 font-bold">
                            {formatConfidence(item.confidence)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* RIGHT HISTORY */}
          <div>
            <Card className="p-6 bg-zinc-950 border border-white/10 rounded-3xl sticky top-24">
              <h2 className="text-2xl font-bold mb-5">📜 History</h2>

              <div className="space-y-3 max-h-[620px] overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">No history yet</p>
                ) : (
                  history.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => openHistoryPopup(item)}
                      className="w-full text-left p-4 rounded-2xl bg-black border border-white/10 hover:border-blue-500 transition"
                    >
                      <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                        {item.text}
                      </p>

                      <div className="flex justify-between text-sm">
                        <span
                          className={
                            isFake(item.prediction)
                              ? "text-red-400"
                              : "text-green-400"
                          }
                        >
                          {item.prediction}
                        </span>

                        <span className="text-blue-400">
                          {formatConfidence(item.confidence)}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {popupOpen && popupData && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-950 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">📄 Full Analysis</h2>

                <button
                  onClick={() => setPopupOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✖
                </button>
              </div>

              {/* FULL NEWS */}
              <div className="mb-8 p-5 rounded-2xl bg-black/40 border border-white/10">
                <p className="text-gray-300 leading-8 whitespace-pre-line">
                  {popupData.text}
                </p>
              </div>

              {/* MODEL RESULTS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {popupData.results.map((item, index) => (
                  <Card
                    key={index}
                    className="p-5 rounded-2xl bg-black border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-4">{item.model}</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Prediction</span>

                        <span
                          className={`font-bold ${getColor(
                            item.prediction
                          )}`}
                        >
                          {item.prediction}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence</span>

                        <span className="text-blue-400 font-bold">
                          {formatConfidence(item.confidence)}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}