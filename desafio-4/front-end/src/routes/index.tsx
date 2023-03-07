import { Routes, Route, Navigate } from "react-router-dom";
import Mongo from "../pages/Mongo";
import Home from "../pages/Home";
import Elastic from "../pages/Elastic";

const Routers = () => (
  <Routes>
    <Route path="/elastic" element={<Elastic />} />
    <Route path="/mongo" element={<Mongo />} />
    <Route path="/home" element={<Home />} />
    <Route path="*" element={<Navigate to="/home" />} />
  </Routes>
);

export default Routers;
