import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HeroSection from "./components/heroSection";
import Footer from "./components/footer";
import ArticleSection from "./components/articleSection";
import PostPage from "./pages/Postpage"; // แก้ path ให้ถูกต้องตาม folder structure

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <NavBar />

      <div className="flex-grow">
        <Routes>
          {/* หน้า Landing Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ArticleSection />
              </>
            }
          />

          {/* หน้าแสดงโพสต์ตาม postId */}
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
