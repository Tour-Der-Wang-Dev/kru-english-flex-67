import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CoursePlans from "@/components/CoursePlans";
import Features from "@/components/Features";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <CoursePlans />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
