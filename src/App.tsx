import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HeroSection from "./components/heroSection";
import Footer from "./components/footer";
import ArticleSection from "./components/articleSection";
import PostPage from "../src/pages/Postpage"; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <NavBar />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ArticleSection />
              </>
            }
          />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
