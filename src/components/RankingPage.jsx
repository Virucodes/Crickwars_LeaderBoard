import React, { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';
import './RankingsPage.css';

const RankingsPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://crickwarsbackend.onrender.com/users/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalColor = (rank) => {
    switch (rank) {
      case 0: return "gold-medal";
      case 1: return "silver-medal";
      case 2: return "bronze-medal";
      default: return "default-medal";
    }
  };

  return (
    <div className="rankings-page">
      <div className="container">
        <div className="header-card">
          <div className="header-content">
            <Trophy className="trophy-icon" />
            <h1>CricWars Leaderboard</h1>
          </div>
        </div>

        {loading ? (
          <div className="card loading-card">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="card error-card">
            <p>{error}</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <div 
                key={entry.username} 
                className={`card leaderboard-card ${index === 0 ? 'top-rank' : ''}`}
              >
                <div className="card-header">
                  <div className="player-info">
                    <div className="rank-display">
                      <span className="rank-number">#{index + 1}</span>
                      <Medal className={`medal-icon ${getMedalColor(index)}`} />
                    </div>
                    <span className="username">{entry.username}</span>
                  </div>
                  <span className="score">Score : {entry.score.toFixed(1)}</span>
                </div>
                <div className="card-content">
                  <p className="stadium-info">
                    <span>Home Stadium:</span> {entry.stadium}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && leaderboard.length === 0 && (
          <div className="card empty-card">
            <p>No teams found in the leaderboard yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingsPage;