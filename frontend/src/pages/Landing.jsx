import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";

const Landing = () => {
  return (
   <div>
    <Header/>
    <Hero/>
    <Services />
    <Testimonial/>
    <main className="p-8">
        <ContactSection />
      </main>
    <Footer/>
   </div>
  );
};

export default Landing;
