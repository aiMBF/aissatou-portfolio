
import { m } from "framer-motion";
import { Database, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string; // Optional GitHub repository link
}

export const ProjectCard = ({ title, description, image, link, github }: ProjectCardProps) => {
  return (
    <m.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
    >
      <a href={link} className="block flex-grow">
        <div className="aspect-video overflow-hidden relative">
          <div className="absolute top-3 right-3 bg-primary/80 p-2 rounded-full z-10">
            <Database className="h-4 w-4 text-white" />
          </div>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </a>
      
      {/* Project links */}
      <div className="px-6 pb-4 mt-auto flex items-center gap-4">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1" aria-label={`GitHub repository for ${title}`}>
            <Github className="h-4 w-4" />
            <span className="text-sm">GitHub</span>
          </a>
        )}
      </div>
    </m.div>
  );
};
