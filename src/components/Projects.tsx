
import { m } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

export const Projects = () => {
  const projects = [
    {
      title: "Cloud Data Lake Architecture",
      description: "Designed and implemented a data lake solution on AWS S3 with Glue ETL pipelines and Athena for analytics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      link: "#",
      github: "https://github.com/username/data-lake-architecture"
    },
    {
      title: "Real-time Analytics Platform",
      description: "Built a streaming data platform using Apache Kafka, Spark Streaming, and Google BigQuery.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      link: "#",
      github: "https://github.com/username/realtime-analytics"
    },
    {
      title: "Enterprise Data Warehouse",
      description: "Migrated an on-premise data warehouse to Snowflake, improving query performance by 10x.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      link: "#",
      github: "https://github.com/username/enterprise-data-warehouse"
    },
    {
      title: "IA Pipeline Orchestration",
      description: "Created a robust IA pipeline using Airflow and MLflow for model training, tracking, and deployment.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      link: "#",
      github: "https://github.com/username/ia-pipeline-orchestration"
    },
    {
      title: "Data Infrastructure as Code",
      description: "Implemented infrastructure as code using Terraform and AWS CloudFormation for scalable deployments.",
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
      link: "#",
      github: "https://github.com/username/infrastructure-as-code"
    }
  ];

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
              {projects.map((project, index) => (
                <CarouselItem key={project.title} className="md:basis-1/2 lg:basis-1/3 pl-4">
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
