import './App.css';
import News from './News';
import NewsArtical from './NewsArtical';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<News/>} />
        <Route path='/article/:id' element={<NewsArtical/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
