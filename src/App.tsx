import { useState, useEffect } from 'react';
import './App.css';
import { competitors } from './data/competitors';
import { db, VOTES_COLLECTION, SETTINGS_COLLECTION, isMockMode } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem('euro-user'));
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [resultsVisible, setResultsVisible] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [allVotes, setAllVotes] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    if (!db || isMockMode) return;

    // Listen to settings (results visibility)
    const unsubSettings = onSnapshot(doc(db, SETTINGS_COLLECTION, 'global'), (doc) => {
      if (doc.exists()) {
        setResultsVisible(doc.data().resultsVisible);
      }
    });

    // Listen to all votes (for leaderboard)
    const unsubVotes = onSnapshot(doc(db, VOTES_COLLECTION, 'all'), (doc) => {
      if (doc.exists()) {
        setAllVotes(doc.data());
      }
    });

    return () => {
      unsubSettings();
      unsubVotes();
    };
  }, []);

  const handleJoin = (name: string) => {
    if (!name.trim()) return;
    localStorage.setItem('euro-user', name);
    setUser(name);
  };

  const handleVote = async (competitorId: string, rating: number) => {
    if (!user) return;
    
    const newVotes = { ...votes, [competitorId]: rating };
    setVotes(newVotes);

    if (db && !isMockMode) {
      // Update global votes document
      // Structure: votes_2026/all -> { userId: { competitorId: rating } }
      const userVotes = allVotes[user] || {};
      userVotes[competitorId] = rating;
      
      await setDoc(doc(db, VOTES_COLLECTION, 'all'), {
        ...allVotes,
        [user]: userVotes
      }, { merge: true });
    }
  };

  const toggleResults = async () => {
    if (password === 'stek666') {
      const newState = !resultsVisible;
      setResultsVisible(newState);
      if (db && !isMockMode) {
        await setDoc(doc(db, SETTINGS_COLLECTION, 'global'), { resultsVisible: newState });
      }
      setAdminMode(false);
      setPassword('');
    } else {
      alert('Wrong password!');
    }
  };

  if (!user) {
    return (
      <div className="app-container">
        <header className="header">
          <h1>Eurovision 2026</h1>
          <p>Vienna Voting App</p>
        </header>
        <div className="join-container">
          <h2>Welcome!</h2>
          <div className="input-group">
            <label>Enter your name to join the family:</label>
            <input 
              type="text" 
              placeholder="Your name..." 
              onKeyDown={(e) => e.key === 'Enter' && handleJoin((e.target as HTMLInputElement).value)}
              id="name-input"
            />
          </div>
          <button onClick={() => handleJoin((document.getElementById('name-input') as HTMLInputElement).value)}>
            Join Session
          </button>
        </div>
      </div>
    );
  }

  // Calculate scores for leaderboard
  const calculateScores = () => {
    const scores: Record<string, number> = {};
    Object.values(allVotes).forEach(userVoteMap => {
      Object.entries(userVoteMap).forEach(([compId, rating]) => {
        scores[compId] = (scores[compId] || 0) + rating;
      });
    });
    return scores;
  };

  const scores = calculateScores();
  const sortedCompetitors = [...competitors].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  return (
    <div className="app-container">
      <header className="header">
        <h1>Eurovision 2026</h1>
        <p>Voting as: <strong>{user}</strong></p>
      </header>

      {resultsVisible ? (
        <div className="leaderboard">
          <h2>Final Results</h2>
          {sortedCompetitors.map((comp, index) => (
            <div key={comp.id} className="leaderboard-item">
              <span>
                <span className="leaderboard-rank">#{index + 1}</span>
                {comp.country}
              </span>
              <span className="leaderboard-score">{scores[comp.id] || 0} pts</span>
            </div>
          ))}
          <button onClick={() => setResultsVisible(false)} style={{marginTop: '1rem', background: '#444', color: 'white'}}>
            Back to Voting
          </button>
        </div>
      ) : (
        <div className="competitor-list">
          <h2>The Grand Final</h2>
          {competitors.map((comp) => (
            <div key={comp.id} className="competitor-card">
              <div className="competitor-order">{comp.order}</div>
              <div className="competitor-info">
                <div className="competitor-country">{comp.country}</div>
                <div className="competitor-details">{comp.artist} - {comp.song}</div>
              </div>
              <div className="rating-area">
                <div className="rating-display">{votes[comp.id] || '-'}</div>
                <select 
                  value={votes[comp.id] || ''} 
                  onChange={(e) => handleVote(comp.id, parseInt(e.target.value))}
                  style={{padding: '5px', borderRadius: '5px'}}
                >
                  <option value="" disabled>Vote</option>
                  {[1,2,3,4,5,6,7,8,10,12].map(n => (
                    <option key={n} value={n}>{n} pts</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="admin-panel">
        {!adminMode ? (
          <button className="admin-toggle" onClick={() => setAdminMode(true)}>
            Admin Settings
          </button>
        ) : (
          <div className="join-container" style={{marginTop: '1rem'}}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={toggleResults}>
              {resultsVisible ? 'Hide Results' : 'Reveal Leaderboard'}
            </button>
            <button onClick={() => setAdminMode(false)} style={{background: '#444', color: 'white'}}>
              Cancel
            </button>
          </div>
        )}
      </div>
      
      {isMockMode && (
        <div style={{marginTop: '2rem', padding: '1rem', background: '#ff4444', borderRadius: '8px', fontSize: '0.8rem'}}>
          <strong>Note:</strong> Firebase not configured. Votes will not be shared across devices. 
          Update <code>src/firebase.ts</code> with your config.
        </div>
      )}
    </div>
  );
}

export default App;
