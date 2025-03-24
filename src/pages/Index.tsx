
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Contact />
      <Projects />
      <Skills />
      <Blog />
    </div>
  );
};

export default Index;
