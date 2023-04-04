// App.js
// Contains "Start Button"
// onClick: display none star button, render Game.js

import './sass/App.scss';
import CharacterSelector from './components/CharacterSelector';
function App() {
  return (
    <div className="App">
      <CharacterSelector />
    </div>
  );
}

export default App;
