import NavBar from './components/navbar';
import HeroSection from './components/heroSection';
import Footer from './components/footer';
import ArticleSection from './components/articleSection';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;
