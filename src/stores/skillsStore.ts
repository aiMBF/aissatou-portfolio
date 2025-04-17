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
    try {
      // First, fetch all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('category_skill')
        .select('*')
        .order('created_at', { ascending: true });

      if (categoriesError) {
        console.error('Error fetching skill categories:', categoriesError);
        return;
      }

      // Next, fetch all skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skill')
        .select('*');

      if (skillsError) {
        console.error('Error fetching skills:', skillsError);
        return;
      }

      // Transform and combine the data
      const skillCategories = categoriesData.map(category => {
        // Find skills for this category
        const categorySkills = skillsData
          .filter(skill => skill.category === category.id)
          .map(skill => skill.skill_name)
          .filter(Boolean); // Filter out null/undefined

        return {
          id: category.id.toString(),
          category: category.category_name || '',
          skills: categorySkills,
        };
      });

      set({ skillCategories });
    } catch (error) {
      console.error('Error in fetchSkillCategories:', error);
    }
  },
  
  addSkillCategory: async (categoryName) => {
    // Insert a new category
    const { data, error } = await supabase
      .from('category_skill')
      .insert({ category_name: categoryName, skills: [] })
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
    // Convert string id to number for the database operation
    const numericId = parseInt(id, 10);
    
    // Update the category
    const { error } = await supabase
      .from('category_skill')
      .update({ category_name: categoryName })
      .eq('id', numericId);

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
    // Convert string id to number for the database operation
    const numericId = parseInt(id, 10);
    
    // Delete the category
    const { error } = await supabase
      .from('category_skill')
      .delete()
      .eq('id', numericId);

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
    
    // Convert string id to number for the database operation
    const numericId = parseInt(categoryId, 10);
    
    // Update the skills in the database
    const { error } = await supabase
      .from('category_skill')
      .update({ skills: updatedSkills })
      .eq('id', numericId);

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
    try {
      // First find the skill ID
      const { data: skillData, error: findError } = await supabase
        .from('skill')
        .select('id')
        .eq('category', parseInt(categoryId, 10))
        .eq('skill_name', oldSkillName)
        .single();
      
      if (findError) {
        console.error('Error finding skill:', findError);
        toast({
          title: "Error",
          description: `Failed to find skill: ${findError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Update the skill
      const { error: updateError } = await supabase
        .from('skill')
        .update({ skill_name: newSkillName })
        .eq('id', skillData.id);

      if (updateError) {
        console.error('Error updating skill:', updateError);
        toast({
          title: "Error",
          description: `Failed to update skill: ${updateError.message}`,
          variant: "destructive",
        });
        return;
      }

      // After updating, fetch all skills again
      await get().fetchSkillCategories();
      
      toast({
        title: "Success",
        description: `Skill updated from "${oldSkillName}" to "${newSkillName}"`,
      });
    } catch (error) {
      console.error('Error in updateSkill:', error);
    }
  },
  
  deleteSkill: async (categoryId, skillName) => {
    try {
      // First find the skill ID
      const { data: skillData, error: findError } = await supabase
        .from('skill')
        .select('id')
        .eq('category', parseInt(categoryId, 10))
        .eq('skill_name', skillName)
        .single();
      
      if (findError) {
        console.error('Error finding skill:', findError);
        toast({
          title: "Error",
          description: `Failed to find skill: ${findError.message}`,
          variant: "destructive",
        });
        return;
      }

      // Delete the skill
      const { error: deleteError } = await supabase
        .from('skill')
        .delete()
        .eq('id', skillData.id);

      if (deleteError) {
        console.error('Error deleting skill:', deleteError);
        toast({
          title: "Error",
          description: `Failed to delete skill: ${deleteError.message}`,
          variant: "destructive",
        });
        return;
      }

      // After deleting, fetch all skills again
      await get().fetchSkillCategories();
      
      toast({
        title: "Success",
        description: `Skill "${skillName}" deleted successfully`,
      });
    } catch (error) {
      console.error('Error in deleteSkill:', error);
    }
  },
}));
