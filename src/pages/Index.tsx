
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { useProjectsStore } from "@/stores/projectsStore";
import { useBlogStore } from "@/stores/blogStore";

const Index = () => {
  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const fetchBlogPosts = useBlogStore(state => state.fetchBlogPosts);

  useEffect(() => {
    fetchProjects();
    fetchBlogPosts();
  }, [fetchProjects, fetchBlogPosts]);

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Contact />
      <Skills />
      <Projects />
      <Blog />
    </div>
  );
};

export default Index;
