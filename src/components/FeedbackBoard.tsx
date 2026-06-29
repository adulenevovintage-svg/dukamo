import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, PenTool, User, Calendar, CheckCircle, Mail, Inbox, Clock, ShieldAlert, Sparkles, ExternalLink, X, RefreshCw, Lock } from 'lucide-react';
import { FeedbackMessage } from '../types';

// Branded HTML template compiler for client-side live rendering inside Gmail Preview
const getEmailHtml = (name: string, rating: number, comment: string, date: string) => {
  const starIconsHtml = Array.from({ length: 5 })
    .map((_, i) => (i < rating ? "★" : "☆"))
    .join(" ");
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FAF5EF;
      color: #2D241C;
      margin: 0;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 500px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #E3D7C8;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(140, 98, 57, 0.05);
    }
    .header {
      background-color: #8C6239;
      color: #ffffff;
      padding: 25px 20px;
      text-align: center;
      border-bottom: 4px solid #C49A6C;
    }
    .logo-container {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #C49A6C;
      background: #FAF5EF;
      margin: 0 auto 10px auto;
      display: inline-block;
    }
    .logo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header h1 {
      font-family: 'Georgia', serif;
      font-size: 22px;
      font-weight: 900;
      margin: 0;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .header p {
      font-size: 9px;
      margin: 4px 0 0 0;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #E6D8C9;
      font-weight: bold;
    }
    .content {
      padding: 30px 20px;
    }
    .notification-badge {
      display: inline-block;
      background-color: #FAF5EF;
      border: 1px solid #8C6239;
      color: #8C6239;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 4px 10px;
      border-radius: 50px;
      margin-bottom: 20px;
    }
    .meta-box {
      border-bottom: 1px solid #E3D7C8;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .author-name {
      font-size: 18px;
      font-weight: 800;
      color: #2D241C;
      margin: 0;
    }
    .date-label {
      font-size: 10px;
      color: #8A7968;
      margin: 2px 0 0 0;
      font-family: monospace;
    }
    .stars {
      color: #C49A6C;
      font-size: 18px;
      margin-top: 8px;
      letter-spacing: 1px;
    }
    .comment-card {
      background-color: #FAF5EF;
      border-left: 4px solid #8C6239;
      padding: 16px;
      border-radius: 0 12px 12px 0;
      margin: 16px 0;
    }
    .comment-text {
      font-size: 13px;
      line-height: 1.6;
      font-style: italic;
      color: #4A3E34;
      margin: 0;
    }
    .action-button {
      display: inline-block;
      background-color: #8C6239;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 10px 20px;
      border-radius: 8px;
      margin-top: 15px;
      box-shadow: 0 3px 5px rgba(140, 98, 57, 0.1);
    }
    .footer {
      background-color: #2D241C;
      color: #A39081;
      text-align: center;
      padding: 20px;
      font-size: 10px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo-container">
        <img src="https://www.image2url.com/r2/default/images/1782749784839-a01b6ede-101a-4ae3-89d9-4c5c3f3e8336.jpg" alt="Dukamo Logo" class="logo-img" />
      </div>
      <h1>Dukamo</h1>
      <p>Bole Specialty Coffee</p>
    </div>
    <div class="content">
      <div class="notification-badge">🌟 Guestbook Whisper</div>
      <div class="meta-box">
        <div class="author-name">${name}</div>
        <div class="date-label">Posted on ${date}</div>
        <div class="stars">${starIconsHtml}</div>
      </div>
      <div class="comment-card">
        <p class="comment-text">"${comment}"</p>
      </div>
      <div style="text-align: center;">
        <span class="action-button">Open Guestbook Board</span>
      </div>
    </div>
    <div class="footer">
      <strong>DUKAMO SPECIALTY COFFEE & SANCTUARY</strong><br>
      Bole Medhanialem, Addis Ababa, Ethiopia<br>
      Powered by Buncho Coffee Roast Engine
    </div>
  </div>
</body>
</html>`;
};

export default function FeedbackBoard() {
  const [reviews, setReviews] = useState<FeedbackMessage[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  // SMTP Email integration states
  const [isSending, setIsSending] = useState(false);
  const [smtpStatusMessage, setSmtpStatusMessage] = useState('');

  const redirectToGmail = () => {
    window.open('https://mail.google.com/mail/u/0/#search/Dukamo+Guestbook', '_blank');
  };

  // Seed initial reviews
  const seedReviews: FeedbackMessage[] = [
    {
      id: 'rev-1',
      name: 'Ephraim Tekle',
      rating: 5,
      comment: 'The Sidama Slam flight is a revelation! Savoring the Hamasho natural side-by-side with the Arbegona washed cup shows the true power of Ethiopian single-origins. And that bamboo ceiling is stunning.',
      date: 'June 25, 2026'
    },
    {
      id: 'rev-2',
      name: 'Martha H.',
      rating: 5,
      comment: 'Obsessed with the Burrito Bowl Chicken. Sliced avocado was super fresh and that cilantro-lime green sauce is incredible. Clean presentation and quick service!',
      date: 'June 20, 2026'
    },
    {
      id: 'rev-3',
      name: 'Samuel Kassa',
      rating: 4,
      comment: 'Excellent double espresso. Perfect tiger-skin crema. This is real specialty coffee in Bole. Highly recommend taking a sit under the wooden lounges.',
      date: 'June 18, 2026'
    }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('dukamo_reviews');
    if (stored) {
      try {
        setReviews(JSON.parse(stored));
      } catch (e) {
        setReviews(seedReviews);
      }
    } else {
      setReviews(seedReviews);
      localStorage.setItem('dukamo_reviews', JSON.stringify(seedReviews));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newDateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const newReview: FeedbackMessage = {
      id: 'rev-' + Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: newDateStr
    };

    setIsSending(true);

    try {
      // 1. Post/Save to local state
      const updated = [newReview, ...reviews];
      setReviews(updated);
      localStorage.setItem('dukamo_reviews', JSON.stringify(updated));

      // 2. Dispatch the Note to the Express backend SMTP router
      const response = await fetch('/api/send-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
          date: newDateStr
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSmtpStatusMessage(data.message);
        
        // Auto open/redirect to real Gmail to check the incoming email!
        redirectToGmail();
      } else {
        setSmtpStatusMessage("Server received review but mail engine reported an error.");
      }
    } catch (err: any) {
      console.error("Failed to send review email to API:", err);
      setSmtpStatusMessage("Network simulation active. Saved locally!");
    } finally {
      setIsSending(false);
      setName('');
      setComment('');
      setRating(5);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 2500);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-l-4 border-[#C49A6C] pl-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C49A6C] font-semibold flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            Guestbook & Reviews
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 uppercase tracking-wide italic">
            Sanctuary Whispers
          </h3>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Hear from our coffee loving community in Addis Ababa, or leave your own note.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Real-time Gmail Link Button */}
          <button
            onClick={redirectToGmail}
            className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            title="Open real Gmail Inbox (amef221412@gmail.com) in a new tab to see the professional layout"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Gmail Inbox</span>
          </button>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#C49A6C] hover:bg-[#D2B48C] text-[#121212] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{showForm ? 'Cancel Note' : 'Leave a Note'}</span>
          </button>
        </div>
      </div>

      {/* Form Overlay toggle */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[#C49A6C]/10 pb-6 mb-6"
          >
            {success ? (
              <div className="p-4 bg-green-500/10 border border-green-500/25 rounded-xl flex flex-col gap-1 text-green-400 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">Your review has been saved in the guestbook!</span>
                </div>
                <p className="text-[10px] text-green-400/70 ml-7">
                  Sent to <span className="font-mono underline text-green-300">amef221412@gmail.com</span> with a premium logo layout. Redirecting to your Gmail!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Almaz Belay"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#242424] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C49A6C] focus:border-[#C49A6C]"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5 h-[34px]">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setRating(stars)}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${stars <= rating ? 'text-[#C49A6C] fill-[#C49A6C]' : 'text-gray-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Your Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the coffee flight notes, your gourmet bowl texture, or the architectural atmosphere..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#242424] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#C49A6C] focus:border-[#C49A6C]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-5 py-2.5 bg-[#C49A6C] text-[#121212] hover:bg-[#D2B48C] rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to Gmail...</span>
                      </>
                    ) : (
                      <span>Post to Guestbook</span>
                    )}
                  </button>
                  <span className="text-[10px] text-gray-500 font-sans">
                    Dispatches instant premium notification to amef221412@gmail.com
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews feed */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
        {reviews.length === 0 ? (
          <p className="text-center text-xs text-gray-500 italic py-6">No reviews written yet. Be the first!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-2">
              <div className="flex items-center justify-between gap-4">
                
                {/* Author Name */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#C49A6C]/10 text-[#C49A6C] flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white font-sans">{rev.name}</h5>
                    <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-mono mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Display */}
                <div className="flex items-center gap-2">
                  {/* View in Gmail Link trigger */}
                  <button 
                    onClick={redirectToGmail}
                    className="text-[9px] font-mono text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 cursor-pointer bg-blue-500/5 px-2 py-1 rounded"
                    title="Open your real Gmail inbox to view this review formatted with the professional Dukamo template"
                  >
                    <Mail className="w-2.5 h-2.5" />
                    <span>View in Gmail</span>
                  </button>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-[#C49A6C] fill-[#C49A6C]' : 'text-gray-700'}`} 
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Text comment */}
              <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
