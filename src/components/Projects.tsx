
import { m } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProjectsStore } from "@/stores/projectsStore";

export const Projects = () => {
  // Use the projects store to get the same data as AdminProjects
  const { projects } = useProjectsStore();

  // Display only up to 4 projects in the carousel for the homepage
  const displayProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Data Engineering Projects</h2>
        </m.div>

        <div className="px-8 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {displayProjects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <ProjectCard {...project} />
                  </m.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
