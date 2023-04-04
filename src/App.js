// App.js
    // Contains "Start Button"
        // onClick: display none star button, render Game.js
import Game from "./components/Game.js"
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
