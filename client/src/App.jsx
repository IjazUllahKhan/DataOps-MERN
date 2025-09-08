import Header from "./components/headers/header";
import Home from "./pages/home/Home";
import Edit from "./pages/edit/Edit";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
