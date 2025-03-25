
import { m } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="bg-secondary section-padding">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Professional Background</h2>
        </m.div>
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-lg leading-relaxed mb-6">
            I'm a specialized Cloud Data Engineer with extensive experience designing and implementing data-driven solutions on major cloud platforms. My expertise lies in building efficient ETL pipelines, data lakes, and analytics platforms that transform raw data into actionable insights.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            With a strong background in both software engineering and data science, I bridge the gap between data infrastructure and business intelligence. I'm passionate about Machine Learning applications in real-world scenarios and implementing DevOps practices that enhance data engineering workflows.
          </p>
          <p className="text-lg leading-relaxed">
            I enjoy sharing my thoughts and experiences on Machine Learning innovations, DevOps best practices, and the evolving landscape of cloud data solutions through my blog and professional network.
          </p>
        </m.div>
      </div>
    </section>
  );
};
