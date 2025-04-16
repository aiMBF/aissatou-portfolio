import { useState } from "react";
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
import { useSkillsStore } from "@/stores/skillsStore";
import { toast } from "@/hooks/use-toast";

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
  const { 
    skillCategories, 
    addSkillCategory, 
    updateSkillCategory, 
    deleteSkillCategory,
    addSkill,
    updateSkill,
    deleteSkill
  } = useSkillsStore();

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{id: string, category: string} | null>(null);
  const [editingSkill, setEditingSkill] = useState<{name: string, categoryId: string} | null>(null);

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

  // Handle category form submission
  const onCategorySubmit = (data: SkillCategoryFormValues) => {
    if (editingCategory) {
      // Update existing category
      updateSkillCategory(editingCategory.id, data.category);
      toast({
        title: "Category updated",
        description: `${data.category} has been updated successfully.`,
      });
    } else {
      // Add new category
      addSkillCategory(data.category);
      toast({
        title: "Category added",
        description: `${data.category} has been added successfully.`,
      });
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
      updateSkill(categoryId, editingSkill.name, skillName);
      toast({
        title: "Skill updated",
        description: `${skillName} has been updated successfully.`,
      });
    } else {
      // Add new skill
      const category = skillCategories.find(cat => cat.id === categoryId);
      if (category && !category.skills.includes(skillName)) {
        addSkill(categoryId, skillName);
        toast({
          title: "Skill added",
          description: `${skillName} has been added to ${category.category}.`,
        });
      } else if (category) {
        toast({
          title: "Skill already exists",
          description: `${skillName} already exists in ${category.category}.`,
          variant: "destructive",
        });
      }
    }
    
    // Reset form and close dialog
    skillForm.reset();
    setIsSkillDialogOpen(false);
    setEditingSkill(null);
  };

  // Handle edit category
  const handleEditCategory = (id: string, category: string) => {
    setEditingCategory({id, category});
    categoryForm.reset({
      category: category,
    });
    setIsCategoryDialogOpen(true);
  };

  // Handle delete category
  const handleDeleteCategory = (id: string) => {
    deleteSkillCategory(id);
    toast({
      title: "Category deleted",
      description: "The category has been removed successfully.",
    });
  };

  // Handle edit skill
  const handleEditSkill = (categoryId: string, skillName: string) => {
    setEditingSkill({ name: skillName, categoryId });
    skillForm.reset({
      name: skillName,
      categoryId,
    });
    setIsSkillDialogOpen(true);
  };

  // Handle delete skill
  const handleDeleteSkill = (categoryId: string, skillName: string) => {
    deleteSkill(categoryId, skillName);
    toast({
      title: "Skill deleted",
      description: `${skillName} has been removed successfully.`,
    });
  };

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
                              <SelectItem key={category.id} value={category.id}>
                                {category.category}
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
              <h2 className="text-lg font-medium">{category.category}</h2>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category.id, category.category)}>
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
                  <TableRow key={`${category.id}-${skill}`}>
                    <TableCell className="font-medium">{skill}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditSkill(category.id, skill)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700" 
                          onClick={() => handleDeleteSkill(category.id, skill)}
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
