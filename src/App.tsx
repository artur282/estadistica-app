import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Theory from "./pages/Theory";
import Examples from "./components/examples";
import Exercise from "./components/Exercise";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Theory />} />
        <Route path="/ejemplos" element={<Examples/>} />
        <Route path="/ejercicios" element={<Exercise/>} />
        <Route path="/progreso" element={<div>Progreso</div>} />
      </Route>
    </Routes>
  );
}