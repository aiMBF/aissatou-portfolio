
import { m } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useLanguageStore } from "@/stores/languageStore";

type EducationItem = {
  id: number;
  degree: {
    en: string;
    fr: string;
  };
  institution: string;
  period: string;
  description: {
    en: string;
    fr: string;
  };
  type: "education" | "certification";
};

export const Education = () => {
  const { language } = useLanguageStore();
  
  // Education and certification data with translations
  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: {
        en: "Master 2 DataScale",
        fr: "Master 2 DataScale"
      },
      institution: "Université Paris-Saclay",
      period: "2023 - 2024",
      description: {
        en: "Specialization in data engineering, big data and cloud computing.",
        fr: "Spécialisation en ingénierie des données, big data et cloud computing."
      },
      type: "education",
    },
    {
      id: 2,
      degree: {
        en: "Engineering Degree in Computer Science",
        fr: "Diplôme d'Ingénieur en Informatique"
      },
      institution: "École Polytechnique de Thiès",
      period: "2018 - 2023",
      description: {
        en: "Fundamentals in programming, algorithms and data structures.",
        fr: "Fondamentaux en programmation, algorithmes et structures de données."
      },
      type: "education",
    },
  ];

  const certificationData: EducationItem[] = [
    {
      id: 6,
      degree: {
        en: "Modernizing Data Lakes and Data Warehouses in Google Cloud Platform",
        fr: "Modernisation des Data Lakes et Data Warehouses sur Google Cloud Platform"
      },
      institution: "Google Cloud Platform",
      period: "2023",
      description: {
        en: "Techniques for building modern, scalable data lakes and warehouses on GCP.",
        fr: "Techniques pour construire des data lakes et entrepôts de données modernes et évolutifs sur GCP."
      },
      type: "certification",
    },
    {
      id: 7,
      degree: {
        en: "BigQuery for Data Warehousing",
        fr: "BigQuery pour le Data Warehousing"
      },
      institution: "Google Cloud Platform",
      period: "2023",
      description: {
        en: "Advanced techniques for data warehousing solutions using BigQuery.",
        fr: "Techniques avancées pour les solutions d'entreposage de données avec BigQuery."
      },
      type: "certification",
    },
    {
      id: 8,
      degree: {
        en: "Building Batch Data Pipelines in Google Cloud",
        fr: "Construction de Pipelines de Données par Lots dans Google Cloud"
      },
      institution: "Google Cloud Platform",
      period: "2022",
      description: {
        en: "Design and implementation of efficient batch processing data pipelines on GCP.",
        fr: "Conception et implémentation de pipelines de traitement de données par lots efficaces sur GCP."
      },
      type: "certification",
    },
    {
      id: 9,
      degree: {
        en: "Build Infrastructure with Terraform on Google Cloud",
        fr: "Construction d'Infrastructure avec Terraform sur Google Cloud"
      },
      institution: "Google Cloud Platform",
      period: "2022",
      description: {
        en: "Infrastructure as Code using Terraform to deploy and manage Google Cloud resources.",
        fr: "Infrastructure as Code utilisant Terraform pour déployer et gérer des ressources Google Cloud."
      },
      type: "certification",
    }
  ];

  const sectionTitle = language === "en" ? "Education & Certifications" : "Éducation & Certifications";
  const academicTitle = language === "en" ? "Academic Background" : "Formation Académique";
  const certificationsTitle = language === "en" ? "Professional Certifications" : "Certifications Professionnelles";
  const trackText = language === "en" ? "Background" : "Parcours";

  return (
    <section id="education" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">{trackText}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{sectionTitle}</h2>
        </m.div>

        <div className="space-y-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">{academicTitle}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {educationData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary">{item.degree[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 font-medium">{item.institution}</div>
                    <div className="text-sm text-muted-foreground mb-4">{item.period}</div>
                    <p className="text-muted-foreground">{item.description[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-accent/10 p-3 rounded-full">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold">{certificationsTitle}</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {certificationData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-accent">{item.degree[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 font-medium">{item.institution}</div>
                    <div className="text-sm text-muted-foreground mb-4">{item.period}</div>
                    <p className="text-muted-foreground">{item.description[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};
