import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { AIChatbot } from "./AIChatbot";
export const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </div>
  );
};
