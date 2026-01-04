import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import Preview from "./pages/Preview";
import SetPassword from "./pages/SetPassword";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import PrivateRoute from "./routes/PrivateRoute"



const App = () => {
  return (
    <Routes>

      {/* 🌐 PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/subscribe" element={<Subscribe />} />
      <Route path="/view/:resumeId" element={<Preview />} />

      {/* 🔐 PROTECTED ROUTES */}
      <Route element={<PrivateRoute/>}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default App;
