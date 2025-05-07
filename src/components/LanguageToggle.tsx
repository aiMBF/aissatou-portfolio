
import { useLanguageStore } from "@/stores/languageStore";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent/20" : ""}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("fr")} className={language === "fr" ? "bg-accent/20" : ""}>
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
