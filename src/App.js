import React, { useEffect } from 'react';
import './App.css';
import AlgorithmVisualizer from './AlgorithmVisualizer/AlgorithmVisualizer';
import Feedback from './Pages/Feedback';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import { useState } from 'react';


function App() {
  const [ feedback, setFeedback] = useState(null);
  const URL = 'https://algovisual-api.herokuapp.com/feedbacks'
  const getFeedback = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setFeedback(data);
  }

  const sendFeedback = async (newFeedback) => {
      await fetch(URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'Application/json',
          },
          body: JSON.stringify(newFeedback),
        })
      getFeedback();
    }

    useEffect(() => getFeedback(), []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AlgorithmVisualizer />} />
        <Route path='/feedback' element={<Feedback feedback={feedback} sendFeedback={sendFeedback}/>} />
      </Routes>
    </Router>
  );
}

export default App;
