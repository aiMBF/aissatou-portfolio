
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash, Link as LinkIcon, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "@/hooks/use-toast";

// Define the Project type
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string; // Only github is optional
};

// Get initial projects data from the Projects component
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Cloud Data Lake Architecture",
    description: "Designed and implemented a data lake solution on AWS S3 with Glue ETL pipelines and Athena for analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    link: "#",
    github: "https://github.com/username/data-lake-architecture"
  },
  {
    id: "2",
    title: "Real-time Analytics Platform",
    description: "Built a streaming data platform using Apache Kafka, Spark Streaming, and Google BigQuery.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    link: "#",
    github: "https://github.com/username/realtime-analytics"
  },
  {
    id: "3",
    title: "Enterprise Data Warehouse",
    description: "Migrated an on-premise data warehouse to Snowflake, improving query performance by 10x.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    link: "#",
    github: "https://github.com/username/enterprise-data-warehouse"
  },
  {
    id: "4",
    title: "IA Pipeline Orchestration",
    description: "Created a robust IA pipeline using Airflow and MLflow for model training, tracking, and deployment.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    link: "#",
    github: "https://github.com/username/ia-pipeline-orchestration"
  },
  {
    id: "5",
    title: "Data Infrastructure as Code",
    description: "Implemented infrastructure as code using Terraform and AWS CloudFormation for scalable deployments.",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
    link: "#",
    github: "https://github.com/username/infrastructure-as-code"
  }
];

// Project schema validation
const projectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid URL" }),
  link: z.string().url({ message: "Please enter a valid URL" }),
  github: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const AdminProjects = () => {
  // Use the initialProjects data from the Projects component
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Initialize form
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      link: "",
      github: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: ProjectFormValues) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...data } 
          : project
      ));
      toast({
        title: "Project updated",
        description: `${data.title} has been updated successfully.`,
      });
    } else {
      // Add new project with all required fields
      const newProject: Project = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link,
        github: data.github,
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Project added",
        description: `${data.title} has been added to your projects.`,
      });
    }
    
    // Reset form and close dialog
    form.reset();
    setIsOpen(false);
    setEditingProject(null);
  };

  // Handle edit project
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      github: project.github || "",
    });
    setIsOpen(true);
  };

  // Handle delete project
  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Project deleted",
      description: "The project has been removed from your portfolio.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              form.reset();
              setEditingProject(null);
            }}>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>
                Fill in the project details. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Project description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username/repo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingProject ? "Update Project" : "Add Project"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Links</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <LinkIcon className="h-4 w-4" />
                    </a>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(project.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProjects;
