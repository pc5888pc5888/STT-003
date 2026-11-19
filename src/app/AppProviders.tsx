import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  // GCSDA's route metadata owns html lang; browser preferences must not override it.
  return <I18nProvider manageDocumentLanguage={false}>{children}</I18nProvider>;
}
