
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

// Define the Project type
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
};

type ProjectsStore = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  fetchProjects: () => Promise<void>;
};

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  
  setProjects: (projects) => set({ projects }),
  
  fetchProjects: async () => {
    const { data, error } = await supabase
      .from('project')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return;
    }

    // Transform the data to match our Project type
    const projects = data.map(project => ({
      id: project.id.toString(),
      title: project.title || '',
      description: project.description || '',
      image: project.image_cover || '',
      link: project.link || '',
      github: project.github_url,
    }));

    set({ projects });
  },
}));
