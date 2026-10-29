import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import SmoothScroll from "./components/SmoothScroll";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Weddings = lazy(() => import("./pages/Weddings"));
const Maternity = lazy(() => import("./pages/Maternity"));
const Newborn = lazy(() => import("./pages/Newborn"));
const Models = lazy(() => import("./pages/Models"));
const Wildlife = lazy(() => import("./pages/Wildlife"));
const Academy = lazy(() => import("./pages/Academy"));
const Contact = lazy(() => import("./pages/Contact"));

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
            <Suspense fallback={<LoadingSkeleton />}>
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
            </Suspense>
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </SmoothScroll>
    </MotionConfig>
  );
}
