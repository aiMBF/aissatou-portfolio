
import { create } from 'zustand';

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
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Omit<Project, 'id'>>) => void;
  deleteProject: (id: string) => void;
};

// Get initial data from localStorage or use default
const getInitialProjects = () => {
  const saved = localStorage.getItem('projects');
  return saved ? JSON.parse(saved) : initialProjects;
};

// Initial projects that match what's in AdminProjects.tsx
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

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: getInitialProjects(),
  
  setProjects: (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
    set({ projects });
  },
  
  addProject: (project) => set((state) => {
    const newProjects = [
      ...state.projects,
      {
        id: Date.now().toString(),
        ...project
      }
    ];
    localStorage.setItem('projects', JSON.stringify(newProjects));
    return { projects: newProjects };
  }),
  
  updateProject: (id, project) => set((state) => {
    const newProjects = state.projects.map((p) => 
      p.id === id ? { ...p, ...project } : p
    );
    localStorage.setItem('projects', JSON.stringify(newProjects));
    return { projects: newProjects };
  }),
  
  deleteProject: (id) => set((state) => {
    const newProjects = state.projects.filter((p) => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(newProjects));
    return { projects: newProjects };
  })
}));
