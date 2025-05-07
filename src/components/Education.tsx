
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
        en: "Master's Degree in Data Engineering",
        fr: "Master en Ingénierie des Données"
      },
      institution: "Université de Paris-Saclay",
      period: "2017 - 2019",
      description: {
        en: "Specialization in data engineering, big data and cloud computing.",
        fr: "Spécialisation en data engineering, big data et cloud computing."
      },
      type: "education",
    },
    {
      id: 2,
      degree: {
        en: "Bachelor's Degree in Computer Science",
        fr: "Licence en Informatique"
      },
      institution: "Université de Paris",
      period: "2014 - 2017",
      description: {
        en: "Fundamentals in programming, algorithms and data structures.",
        fr: "Fondamentaux en programmation, algorithmes et structures de données."
      },
      type: "education",
    },
  ];

  const certificationData: EducationItem[] = [
    {
      id: 3,
      degree: {
        en: "AWS Certified Data Analytics",
        fr: "AWS Certified Data Analytics"
      },
      institution: "Amazon Web Services",
      period: "2023",
      description: {
        en: "Specialized certification in designing and implementing data analytics solutions on AWS.",
        fr: "Certification spécialisée dans la conception et l'implémentation de solutions d'analyse de données sur AWS."
      },
      type: "certification",
    },
    {
      id: 4,
      degree: {
        en: "Google Professional Data Engineer",
        fr: "Google Professional Data Engineer"
      },
      institution: "Google Cloud",
      period: "2022",
      description: {
        en: "Expertise in designing, building, and managing data processing systems on GCP.",
        fr: "Expertise en conception, création et gestion de solutions de traitement de données sur GCP."
      },
      type: "certification",
    },
    {
      id: 5,
      degree: {
        en: "Microsoft Certified: Azure Data Engineer Associate",
        fr: "Microsoft Certified: Azure Data Engineer Associate"
      },
      institution: "Microsoft",
      period: "2021",
      description: {
        en: "Skills in integrating, transforming, and consolidating data from various disparate systems.",
        fr: "Compétences en intégration, transformation et consolidation de données provenant de systèmes disparates."
      },
      type: "certification",
    },
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
