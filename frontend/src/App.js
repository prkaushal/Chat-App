import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Chat from "./component/Chat";

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </Router>

  );
}

export default App;
