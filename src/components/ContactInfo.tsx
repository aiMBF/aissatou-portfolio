
import { m } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export const ContactInfo = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
    >
      <div className="bg-secondary p-6 rounded-lg flex items-center gap-4">
        <div className="bg-accent/10 p-3 rounded-full">
          <Mail className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Email</h3>
          <a href="mailto:aissatou.balde.cop@gmail.com" className="text-primary hover:underline">
            aissatou.balde.cop@gmail.com
          </a>
        </div>
      </div>
      
      
      <div className="bg-secondary p-6 rounded-lg flex items-center gap-4">
        <div className="bg-accent/10 p-3 rounded-full">
          <Linkedin className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-medium mb-1">LinkedIn</h3>
          <a href="https://www.linkedin.com/in/aissatou-balde-845553196/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Linkedin Profile
          </a>
        </div>
      </div>
      
      <div className="bg-secondary p-6 rounded-lg flex items-center gap-4">
        <div className="bg-accent/10 p-3 rounded-full">
          <Github className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="font-medium mb-1">GitHub</h3>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            github.com/aiMBF
          </a>
        </div>
      </div>
    </m.div>
  );
};
