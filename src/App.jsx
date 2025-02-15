import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RankingsPage from './components/RankingPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamData, setTeamData] = useState({
    name: '',
    purchasedPlayers: [],
    budget: 10000
  });

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setTeamData((prev) => ({
      ...prev,
      name: username
    }));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Routes>

        
          <Route 
            path="/" 
            element=<RankingsPage teamData={teamData} />  
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;