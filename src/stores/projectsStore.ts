
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  
  // Add CRUD operations
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
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
  
  addProject: async (project) => {
    // Insert a new project
    const { data, error } = await supabase
      .from('project')
      .insert([{
        title: project.title,
        description: project.description,
        image_cover: project.image,
        link: project.link,
        github_url: project.github,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: `Failed to add project: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Add the new project to the state
    const newProject: Project = {
      id: data.id.toString(),
      title: data.title || '',
      description: data.description || '',
      image: data.image_cover || '',
      link: data.link || '',
      github: data.github_url,
    };

    set(state => ({
      projects: [newProject, ...state.projects]
    }));
  },
  
  updateProject: async (id, project) => {
    // Prepare the update data
    const updateData: any = {};
    if (project.title !== undefined) updateData.title = project.title;
    if (project.description !== undefined) updateData.description = project.description;
    if (project.image !== undefined) updateData.image_cover = project.image;
    if (project.link !== undefined) updateData.link = project.link;
    if (project.github !== undefined) updateData.github_url = project.github;

    // Update the project
    const { error } = await supabase
      .from('project')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: `Failed to update project: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the project in the state
    set(state => ({
      projects: state.projects.map(proj => 
        proj.id === id ? { ...proj, ...project } : proj
      )
    }));
  },
  
  deleteProject: async (id) => {
    // Delete the project
    const { error } = await supabase
      .from('project')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: `Failed to delete project: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Remove the project from the state
    set(state => ({
      projects: state.projects.filter(proj => proj.id !== id)
    }));
  },
}));
