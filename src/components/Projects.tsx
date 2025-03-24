
import { m } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <m.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
