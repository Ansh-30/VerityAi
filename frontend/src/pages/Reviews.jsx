import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import { reviewService, extractError } from '../services/api';
import { useToast } from '../hooks/useToast';

const STORAGE_KEY = 'verity-ai-reviews';

export default function Reviews() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { notify } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, []);

  const saveReviews = (items) => {
    setReviews(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      notify('Please enter your feedback.', 'error');
      return;
    }

    setLoading(true);

    try {
      await reviewService.submit({
        name: name || 'Anonymous',
        feedback,
      });

      const newReview = {
        id: Date.now(),
        name: name || 'Anonymous',
        feedback,
        createdAt: new Date().toISOString(),
      };

      const updatedReviews = [newReview, ...reviews].slice(0, 10);

      saveReviews(updatedReviews);

      setName('');
      setFeedback('');

      notify('Review submitted successfully!', 'success');
    } catch (error) {
      notify(extractError(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* FORM */}
          <Card className="p-8 bg-zinc-950 border border-white/10 rounded-3xl">
            <h1 className="text-3xl font-bold mb-2">Share Your Feedback</h1>
            <p className="text-gray-400 mb-8">
              Help us improve Verity AI by sharing your thoughts.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Name (Optional)
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name..."
                  className="w-full p-4 rounded-2xl bg-black border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Feedback */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Your Feedback
                </label>

                <textarea
                  rows={6}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full p-4 rounded-2xl bg-black border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? '⏳ Submitting...' : '🚀 Submit Review'}
              </Button>
            </form>
          </Card>

          {/* REVIEWS */}
          <div>
            <h2 className="text-2xl font-bold mb-6">📝 Recent Reviews</h2>

            {reviews.length > 0 ? (
              <div className="grid gap-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Card className="p-6 bg-zinc-950 border border-white/10 rounded-3xl hover:border-blue-500 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-white">
                            {review.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-sm">
                        {review.feedback}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center bg-zinc-950 border border-white/10 rounded-3xl">
                <p className="text-xl text-gray-400 mb-2">
                  No reviews yet
                </p>
                <p className="text-sm text-gray-500">
                  Be the first to share feedback.
                </p>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}