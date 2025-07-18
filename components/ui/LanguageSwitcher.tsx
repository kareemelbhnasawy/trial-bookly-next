"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAlternateLocale, getLocalizedPath } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: "header" | "footer" | "dropdown";
  className?: string;
}

const languages = [
  {
    code: "ar",
    name: "العربية",
    nameEn: "Arabic",
    flag: "🇸🇦",
    direction: "rtl",
  },
  {
    code: "en",
    name: "English",
    nameEn: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
];

export default function LanguageSwitcher({
  currentLocale,
  variant = "dropdown",
  className = "",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Create the new path with the new locale
    const newPath = getLocalizedPath(pathname, newLocale);

    // Set the new locale in localStorage for persistence
    localStorage.setItem("preferred-locale", newLocale);

    // Update the document direction
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLocale;

    // Navigate to the new path
    router.push(newPath);

    // Close dropdown
    setIsOpen(false);

    // Reload the page to apply the new locale completely
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (variant === "header") {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 space-x-reverse"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </div>
                    {currentLocale === language.code && (
                      <Check className="h-4 w-4 text-rawasy-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div
        className={`flex items-center space-x-3 space-x-reverse ${className}`}
      >
        <Globe className="h-4 w-4 text-gray-400" />
        <div className="flex space-x-2 space-x-reverse">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`text-sm transition-colors ${
                currentLocale === language.code
                  ? "text-rawasy-400 font-medium"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-right"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className="text-lg">{language.flag}</span>
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-gray-500">
                        {language.nameEn}
                      </div>
                    </div>
                  </div>
                  {currentLocale === language.code && (
                    <Check className="h-4 w-4 text-rawasy-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Hook for getting current locale
export function useCurrentLocale(): string {
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split("/")[1];

  // Return locale if it's valid, otherwise return default
  return ["ar", "en"].includes(locale) ? locale : "ar";
}

// Helper component for quick language toggle
export function LanguageToggle({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const alternateLocale = getAlternateLocale(currentLocale);
  const alternateName = alternateLocale === "ar" ? "العربية" : "English";

  const handleToggle = () => {
    const newPath = getLocalizedPath(pathname, alternateLocale);
    localStorage.setItem("preferred-locale", alternateLocale);
    document.documentElement.dir = alternateLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = alternateLocale;
    router.push(newPath);
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="flex items-center space-x-2 space-x-reverse"
    >
      <Globe className="h-4 w-4" />
      <span>{alternateName}</span>
    </Button>
  );
}
