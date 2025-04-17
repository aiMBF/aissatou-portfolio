
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
};

type SkillsStore = {
  skillCategories: SkillCategory[];
  setSkillCategories: (skillCategories: SkillCategory[]) => void;
  fetchSkillCategories: () => Promise<void>;
  
  // Add CRUD operations
  addSkillCategory: (categoryName: string) => Promise<void>;
  updateSkillCategory: (id: string, categoryName: string) => Promise<void>;
  deleteSkillCategory: (id: string) => Promise<void>;
  addSkill: (categoryId: string, skillName: string) => Promise<void>;
  updateSkill: (categoryId: string, oldSkillName: string, newSkillName: string) => Promise<void>;
  deleteSkill: (categoryId: string, skillName: string) => Promise<void>;
};

export const useSkillsStore = create<SkillsStore>((set, get) => ({
  skillCategories: [],
  
  setSkillCategories: (skillCategories) => set({ skillCategories }),
  
  fetchSkillCategories: async () => {
    const { data, error } = await supabase
      .from('category_skill')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching skill categories:', error);
      return;
    }

    // Transform the data to match our SkillCategory type
    const skillCategories = data.map(category => ({
      id: category.id.toString(),
      category: category.category_name || '',
      skills: category.skills || [],
    }));

    set({ skillCategories });
  },
  
  addSkillCategory: async (categoryName) => {
    // Insert a new category
    const { data, error } = await supabase
      .from('category_skill')
      .insert([{ category_name: categoryName, skills: [] }])
      .select()
      .single();

    if (error) {
      console.error('Error adding skill category:', error);
      toast({
        title: "Error",
        description: `Failed to add category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Add the new category to the state
    const newCategory = {
      id: data.id.toString(),
      category: data.category_name || '',
      skills: data.skills || [],
    };

    set(state => ({
      skillCategories: [...state.skillCategories, newCategory]
    }));
  },
  
  updateSkillCategory: async (id, categoryName) => {
    // Update the category
    const { error } = await supabase
      .from('category_skill')
      .update({ category_name: categoryName })
      .eq('id', id);

    if (error) {
      console.error('Error updating skill category:', error);
      toast({
        title: "Error",
        description: `Failed to update category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the category in the state
    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === id ? { ...cat, category: categoryName } : cat
      )
    }));
  },
  
  deleteSkillCategory: async (id) => {
    // Delete the category
    const { error } = await supabase
      .from('category_skill')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting skill category:', error);
      toast({
        title: "Error",
        description: `Failed to delete category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Remove the category from the state
    set(state => ({
      skillCategories: state.skillCategories.filter(cat => cat.id !== id)
    }));
  },
  
  addSkill: async (categoryId, skillName) => {
    const category = get().skillCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Category not found",
        variant: "destructive",
      });
      return;
    }
    
    const updatedSkills = [...category.skills, skillName];
    
    // Update the skills in the database
    const { error } = await supabase
      .from('category_skill')
      .update({ skills: updatedSkills })
      .eq('id', categoryId);

    if (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: `Failed to add skill: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the skills in the state
    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === categoryId ? { ...cat, skills: updatedSkills } : cat
      )
    }));
  },
  
  updateSkill: async (categoryId, oldSkillName, newSkillName) => {
    const category = get().skillCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Category not found",
        variant: "destructive",
      });
      return;
    }
    
    const updatedSkills = category.skills.map(skill => 
      skill === oldSkillName ? newSkillName : skill
    );
    
    // Update the skills in the database
    const { error } = await supabase
      .from('category_skill')
      .update({ skills: updatedSkills })
      .eq('id', categoryId);

    if (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Error",
        description: `Failed to update skill: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the skills in the state
    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === categoryId ? { ...cat, skills: updatedSkills } : cat
      )
    }));
  },
  
  deleteSkill: async (categoryId, skillName) => {
    const category = get().skillCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Category not found",
        variant: "destructive",
      });
      return;
    }
    
    const updatedSkills = category.skills.filter(skill => skill !== skillName);
    
    // Update the skills in the database
    const { error } = await supabase
      .from('category_skill')
      .update({ skills: updatedSkills })
      .eq('id', categoryId);

    if (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Error",
        description: `Failed to delete skill: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the skills in the state
    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === categoryId ? { ...cat, skills: updatedSkills } : cat
      )
    }));
  },
}));
