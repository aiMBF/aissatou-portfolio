
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Blog } from "@/components/Blog";
import { useProjectsStore } from "@/stores/projectsStore";
import { useSkillsStore } from "@/stores/skills/skillsStore";
import { useBlogStore } from "@/stores/blogStore";

const Index = () => {
  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const fetchSkillCategories = useSkillsStore(state => state.fetchSkillCategories);
  const fetchBlogPosts = useBlogStore(state => state.fetchBlogPosts);

  useEffect(() => {
    fetchProjects();
    fetchSkillCategories();
    fetchBlogPosts();
  }, [fetchProjects, fetchSkillCategories, fetchBlogPosts]);

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
