import "@/App.css";
import "lenis/dist/lenis.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Recruiter from "@/pages/Recruiter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruiter" element={<Recruiter />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster theme="light" position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
