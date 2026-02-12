import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/DashboardCCC/layout/Header';
import Sidebar from './components/DashboardCCC/layout/Sidebar';
import ProfileCCC from './Pages/DashboardCCC/Profile';
import NewsFeed from './Pages/DashboardCCC/NewsFeed';
import ChatCenter from './Pages/DashboardCCC/ChatCenter';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
        <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/profile" element={<ProfileCCC />} />
              <Route path="/newsfeed" element={<NewsFeed />} />
              <Route path="/chatcenter" element={<ChatCenter />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
