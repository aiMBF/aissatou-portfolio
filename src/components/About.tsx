
import { m } from "framer-motion";
import { useLanguageStore } from "@/stores/languageStore";

export const About = () => {
  const { language } = useLanguageStore();

  const aboutText = {
    title: {
      en: "Professional Background",
      fr: "Parcours Professionnel"
    },
    subtitle: {
      en: "About Me",
      fr: "À Propos de Moi"
    },
    paragraphs: {
      en: [
        "I'm a specialized Cloud Data Engineer with extensive experience designing and implementing data-driven solutions on major cloud platforms. My expertise lies in building efficient ETL pipelines, data lakes, and analytics platforms that transform raw data into actionable insights.",
        "With a strong background in both software engineering and data science, I bridge the gap between data infrastructure and business intelligence. I'm passionate about AI applications in real-world scenarios and implementing modern practices that enhance data engineering workflows.",
        "I enjoy sharing my thoughts and experiences on AI innovations, data engineering best practices, and the evolving landscape of cloud data solutions through my blog."
      ],
      fr: [
        "Je suis une ingénieure de données Cloud spécialisée avec une vaste expérience dans la conception et la mise en œuvre de solutions basées sur les données sur les principales plateformes cloud. Mon expertise réside dans la création de pipelines ETL efficaces, de lacs de données et de plateformes d'analyse qui transforment les données brutes en informations exploitables.",
        "Avec une solide formation en génie logiciel et en science des données, je fais le pont entre l'infrastructure de données et l'intelligence d'affaires. Je suis passionnée par les applications d'IA dans des scénarios réels et la mise en œuvre de pratiques modernes qui améliorent les flux de travail d'ingénierie de données.",
        "J'aime partager mes réflexions et mes expériences sur les innovations en IA, les meilleures pratiques d'ingénierie de données et l'évolution du paysage des solutions de données cloud à travers mon blog."
      ]
    }
  };

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
          <span className="text-sm uppercase tracking-wider text-muted-foreground">{aboutText.subtitle[language]}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{aboutText.title[language]}</h2>
        </m.div>
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          {aboutText.paragraphs[language].map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </m.div>
      </div>
    </section>
  );
};
