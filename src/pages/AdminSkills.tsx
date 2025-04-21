
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

type SkillCategory = {
  id: number;
  category_name: string;
  skills: {
    id: number;
    skill_name: string;
  }[];
};

// Skill category schema validation
const skillCategorySchema = z.object({
  category: z.string().min(3, { message: "Category name must be at least 3 characters" }),
});

// Skill schema validation
const skillSchema = z.object({
  name: z.string().min(1, { message: "Skill name is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
});

type SkillCategoryFormValues = z.infer<typeof skillCategorySchema>;
type SkillFormValues = z.infer<typeof skillSchema>;

const AdminSkills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{id: number, category: string} | null>(null);
  const [editingSkill, setEditingSkill] = useState<{id: number, name: string, categoryId: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize category form
  const categoryForm = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(skillCategorySchema),
    defaultValues: {
      category: "",
    },
  });

  // Initialize skill form
  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  // Fetch skills and categories
  const fetchSkillsData = async () => {
    setIsLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('category_skill')
        .select('*')
        .order('category_name', { ascending: true });
        
      if (categoriesError) {
        throw categoriesError;
      }

      // Fetch skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skill')
        .select('*')
        .order('skill_name', { ascending: true });
        
      if (skillsError) {
        throw skillsError;
      }

      // Process data to create skill categories with their skills
      const processedCategories = categoriesData.map((category) => {
        const categorySkills = skillsData
          .filter(skill => skill.category === category.category_name)
          .map(skill => ({
            id: skill.id,
            skill_name: skill.skill_name || ''
          }));
          
        return {
          id: category.id,
          category_name: category.category_name,
          skills: categorySkills
        };
      });

      setSkillCategories(processedCategories);
    } catch (error) {
      console.error('Error fetching skills data:', error);
      toast({
        title: "Failed to load skills",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  // Add a new skill category
  const addSkillCategory = async (categoryName: string) => {
    try {
      const { data, error } = await supabase
        .from('category_skill')
        .insert([{ category_name: categoryName }])
        .select()
        .single();
        
      if (error) throw error;
      
      setSkillCategories([...skillCategories, { 
        id: data.id, 
        category_name: data.category_name,
        skills: []
      }]);
      
      toast({
        title: "Category added",
        description: `${categoryName} has been added successfully.`,
      });
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        title: "Failed to add category",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update an existing skill category
  const updateSkillCategory = async (id: number, newCategoryName: string) => {
    try {
      // First get the old category name
      const categoryToUpdate = skillCategories.find(cat => cat.id === id);
      if (!categoryToUpdate) throw new Error("Category not found");
      
      const oldCategoryName = categoryToUpdate.category_name;
      
      // Update category in category_skill table
      const { error: categoryError } = await supabase
        .from('category_skill')
        .update({ category_name: newCategoryName })
        .eq('id', id);
        
      if (categoryError) throw categoryError;
      
      // Also update all skills that belong to this category
      const { error: skillsError } = await supabase
        .from('skill')
        .update({ category: newCategoryName })
        .eq('category', oldCategoryName);
        
      if (skillsError) throw skillsError;
      
      // Update local state
      setSkillCategories(skillCategories.map(category => {
        if (category.id === id) {
          return { ...category, category_name: newCategoryName };
        }
        return category;
      }));
      
      toast({
        title: "Category updated",
        description: `Category has been renamed to ${newCategoryName}.`,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: "Failed to update category",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete a skill category
  const deleteSkillCategory = async (id: number) => {
    try {
      const categoryToDelete = skillCategories.find(cat => cat.id === id);
      if (!categoryToDelete) throw new Error("Category not found");
      
      // First delete all skills in this category
      const { error: skillsError } = await supabase
        .from('skill')
        .delete()
        .eq('category', categoryToDelete.category_name);
        
      if (skillsError) throw skillsError;
      
      // Then delete the category
      const { error: categoryError } = await supabase
        .from('category_skill')
        .delete()
        .eq('id', id);
        
      if (categoryError) throw categoryError;
      
      // Update local state
      setSkillCategories(skillCategories.filter(category => category.id !== id));
      
      toast({
        title: "Category deleted",
        description: "The category and all its skills have been removed.",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Failed to delete category",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add a new skill
  const addSkill = async (categoryId: string, skillName: string) => {
    try {
      const id = parseInt(categoryId);
      const category = skillCategories.find(cat => cat.id === id);
      if (!category) throw new Error("Category not found");
      
      const { data, error } = await supabase
        .from('skill')
        .insert([{ 
          category: category.category_name, 
          skill_name: skillName 
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      // Update local state
      setSkillCategories(skillCategories.map(cat => {
        if (cat.id === id) {
          return {
            ...cat,
            skills: [...cat.skills, { id: data.id, skill_name: skillName }]
          };
        }
        return cat;
      }));
      
      toast({
        title: "Skill added",
        description: `${skillName} has been added to ${category.category_name}.`,
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Failed to add skill",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update an existing skill
  const updateSkill = async (categoryId: string, oldSkillId: number, newSkillName: string) => {
    try {
      const id = parseInt(categoryId);
      
      const { error } = await supabase
        .from('skill')
        .update({ skill_name: newSkillName })
        .eq('id', oldSkillId);
        
      if (error) throw error;
      
      // Update local state
      setSkillCategories(skillCategories.map(category => {
        if (category.id === id) {
          return {
            ...category,
            skills: category.skills.map(skill => {
              if (skill.id === oldSkillId) {
                return { ...skill, skill_name: newSkillName };
              }
              return skill;
            })
          };
        }
        return category;
      }));
      
      toast({
        title: "Skill updated",
        description: `Skill has been updated to ${newSkillName}.`,
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: "Failed to update skill",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Delete a skill
  const deleteSkill = async (categoryId: string, skillId: number) => {
    try {
      const id = parseInt(categoryId);
      
      const { error } = await supabase
        .from('skill')
        .delete()
        .eq('id', skillId);
        
      if (error) throw error;
      
      // Update local state
      setSkillCategories(skillCategories.map(category => {
        if (category.id === id) {
          return {
            ...category,
            skills: category.skills.filter(skill => skill.id !== skillId)
          };
        }
        return category;
      }));
      
      toast({
        title: "Skill deleted",
        description: "The skill has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: "Failed to delete skill",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle category form submission
  const onCategorySubmit = (data: SkillCategoryFormValues) => {
    if (editingCategory) {
      // Update existing category
      updateSkillCategory(editingCategory.id, data.category);
    } else {
      // Add new category
      addSkillCategory(data.category);
    }
    
    // Reset form and close dialog
    categoryForm.reset();
    setIsCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  // Handle skill form submission
  const onSkillSubmit = (data: SkillFormValues) => {
    const categoryId = data.categoryId;
    const skillName = data.name;

    if (editingSkill) {
      // Update existing skill
      updateSkill(categoryId, editingSkill.id, skillName);
    } else {
      // Add new skill
      addSkill(categoryId, skillName);
    }
    
    // Reset form and close dialog
    skillForm.reset();
    setIsSkillDialogOpen(false);
    setEditingSkill(null);
  };

  // Handle edit category
  const handleEditCategory = (id: number, category: string) => {
    setEditingCategory({id, category});
    categoryForm.reset({
      category: category,
    });
    setIsCategoryDialogOpen(true);
  };

  // Handle delete category
  const handleDeleteCategory = (id: number) => {
    deleteSkillCategory(id);
  };

  // Handle edit skill
  const handleEditSkill = (categoryId: number, skillId: number, skillName: string) => {
    setEditingSkill({ id: skillId, name: skillName, categoryId });
    skillForm.reset({
      name: skillName,
      categoryId: categoryId.toString(),
    });
    setIsSkillDialogOpen(true);
  };

  // Handle delete skill
  const handleDeleteSkill = (categoryId: number, skillId: number) => {
    deleteSkill(categoryId.toString(), skillId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading skills...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <div className="flex gap-4">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                categoryForm.reset();
                setEditingCategory(null);
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add New Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                <DialogDescription>
                  Enter a name for the skill category.
                </DialogDescription>
              </DialogHeader>
              <Form {...categoryForm}>
                <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                  <FormField
                    control={categoryForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Programming Languages" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">{editingCategory ? "Update Category" : "Add Category"}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                skillForm.reset();
                setEditingSkill(null);
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add New Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                <DialogDescription>
                  Enter a name for the skill and select its category.
                </DialogDescription>
              </DialogHeader>
              <Form {...skillForm}>
                <form onSubmit={skillForm.handleSubmit(onSkillSubmit)} className="space-y-4">
                  <FormField
                    control={skillForm.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {skillCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.category_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={skillForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Python" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">{editingSkill ? "Update Skill" : "Add Skill"}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div key={category.id} className="rounded-md border">
            <div className="bg-muted px-4 py-3 flex justify-between items-center">
              <h2 className="text-lg font-medium">{category.category_name}</h2>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category.id, category.category_name)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700" 
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.skills.map((skill) => (
                  <TableRow key={`${category.id}-${skill.id}`}>
                    <TableCell className="font-medium">{skill.skill_name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditSkill(category.id, skill.id, skill.skill_name)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDeleteSkill(category.id, skill.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {category.skills.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-4">
                      No skills added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ))}
        
        {skillCategories.length === 0 && (
          <div className="text-center p-8 border rounded-md">
            <p className="text-muted-foreground">No skill categories added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;
