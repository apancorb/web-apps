/* BEM convention */
import './App.css';
import Header from './components/Header/Header';
import SwipeButtoms from './components/SwipeButtoms/SwipeButtoms';
import TinderCards from './components/TinderCards/TinderCards';

function App() {
  return (
    <div className="app">

      {/* Header */}
      <Header />

      {/* TinderCards */}
      <TinderCards />

      {/* SwipeButtons */}
      <SwipeButtoms />

    </div>
  );
} 

export default App;
