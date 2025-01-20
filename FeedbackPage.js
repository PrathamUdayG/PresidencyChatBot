import React, { useState, useEffect } from 'react';

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(savedFeedback);
  }, []);

  const handleReplySubmit = (index) => {
    const newFeedbacks = [...feedbacks];
    newFeedbacks[index].reply = reply;  // Add reply to the specific feedback
    setFeedbacks(newFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));  // Save updated feedback to localStorage
    setReply('');  // Clear the reply field
  };

  return (
    <div className="feedbackPage">
      <h1>Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet!</p>
      ) : (
        feedbacks.map((feedback, index) => (
          <div key={index} className="feedbackItem">
            <h3>{feedback.name}</h3>
            <p>Email: {feedback.email}</p>
            <p>Phone: {feedback.phone}</p>
            <p>Query: {feedback.query}</p>
            <p>Reply: {feedback.reply || 'No reply yet'}</p>

            {/* Reply Form */}
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply to feedback"
            ></textarea>
            <button onClick={() => handleReplySubmit(index)}>Submit Reply</button>
          </div>
        ))
      )}
    </div>
  );
}

export default FeedbackPage;
