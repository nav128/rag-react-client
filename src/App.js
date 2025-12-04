import './App.css';
import Chat from './components/Chat';
function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  return (
    <Chat />
  )
}

export default App;
