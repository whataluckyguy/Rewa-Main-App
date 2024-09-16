import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { LoginContext } from "./Pages/LoginContext";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <LoginContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
