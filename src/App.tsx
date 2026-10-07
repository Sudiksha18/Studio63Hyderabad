import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Weddings from "./pages/Weddings";
import Maternity from "./pages/Maternity";
import Newborn from "./pages/Newborn";
import Models from "./pages/Models";
import Wildlife from "./pages/Wildlife";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/weddings" element={<Weddings />} />
              <Route path="/maternity" element={<Maternity />} />
              <Route path="/newborn" element={<Newborn />} />
              <Route path="/models" element={<Models />} />
              <Route path="/wildlife" element={<Wildlife />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </SmoothScroll>
    </MotionConfig>
  );
}
