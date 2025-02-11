// components/providers/provider.tsx
import { ThemeProvider } from "@/components/context/ThemeContext";
import { LanguageProvider } from "@/components/context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
