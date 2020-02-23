import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import routes from './routes'
import EnterExpense from './components/EnterExpense'

function App() {
  return (
    <HashRouter>
      <div className="App">
      {routes}
    </div>
    </HashRouter>
  );
}

export default App;
