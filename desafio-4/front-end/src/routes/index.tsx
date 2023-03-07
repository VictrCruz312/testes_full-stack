import { Routes, Route, Navigate } from "react-router-dom";
import Elastic from "../pages/Elastic";
import Mongo from "../pages/Mongo";

const Routers = () => (
  <Routes>
    <Route path="/mongo" element={<Mongo />} />
    <Route path="/elastic" element={<Elastic />} />
    <Route path="*" element={<Navigate to="/mongo" />} />
  </Routes>
);

export default Routers;
