// @/components/common/Header.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-50 bg-background/80 backdrop-blur-sm border-b">
      <div>
        {!isHome && (
          <Link href="/">
            <Button variant="ghost" className="flex items-center">
              <ChevronLeft className="size-4 mr-2" />
              {t.back}
            </Button>
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default Header;
