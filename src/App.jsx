import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/DashboardCCC/layout/Header';
import Sidebar from './components/DashboardCCC/layout/Sidebar';
import ProfileCCC from './Pages/DashboardCCC/Profile';
import NewsFeed from './Pages/DashboardCCC/NewsFeed';
import ChatRoomCCC from './Pages/DashboardCCC/ChatRoomCCC';
import ChatCenter from './Pages/DashboardCCC/ChatCenter';
import SupportPage from './Pages/DashboardCCC/Support';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/profile" element={<ProfileCCC />} />
              <Route path="/newsfeed" element={<NewsFeed />} />
              <Route path="/chatroom" element={<ChatRoomCCC />} />
              <Route path="/chatcenter" element={<ChatCenter />} />
              <Route path="/support" element={<SupportPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;