import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Help from "./pages/Help";
import Login from "./pages/Login";

function App() {
  const user = {
    name: "John Doe",
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}

export default App;
