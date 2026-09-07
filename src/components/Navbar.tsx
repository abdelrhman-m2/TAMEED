import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/systems", key: "nav.systems" },
  { to: "/industries", key: "nav.industries" },
  { to: "/clients", key: "nav.clients" },
  { to: "/contact", key: "nav.contact" },
];

const systemItems = [
  { to: "/systems#financial-accounting", key: 0 },
  { to: "/systems#fixed-assets", key: 1 },
  { to: "/systems#warehouses-sales-purchasing", key: 2 },
  { to: "/systems#international-purchasing", key: 3 },
  { to: "/systems#hr-payroll", key: 4 },
  { to: "/systems#point-of-sale", key: 5 },
] as const;

export const Navbar = () => {
  const { t, lang, toggle } = useI18n();
  const catalog = t("systemsCatalog") as { items: { t: string }[] };
  const systemLabels = catalog.items ?? [];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-base",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="TAMEED home"><Logo /></Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            if (l.to !== "/systems") {
              return (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-base hover:text-primary",
                        isActive && "text-primary"
                      )
                    }
                  >
                    {t(l.key)}
                  </NavLink>
                </li>
              );
            }

            const isSystemsActive = loc.pathname === "/systems";
            return (
              <li key={l.to} className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-base hover:text-primary",
                      isSystemsActive && "text-primary"
                    )}
                  >
                    {t(l.key)}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[280px]">
                    <DropdownMenuItem asChild>
                      <Link to="/systems" className="cursor-pointer">{t("nav.systems")}</Link>
                    </DropdownMenuItem>
                    <div className="my-1 h-px bg-muted" />
                    {systemItems.map((it) => (
                      <DropdownMenuItem key={it.to} asChild>
                        <Link to={it.to} className="cursor-pointer">
                          {systemLabels[it.key]?.t ?? ""}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-primary transition-base hover:border-accent hover:text-accent"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
            <Link to="/contact?type=quote">{t("nav.quote")}</Link>
          </Button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="container-wide flex flex-col py-3">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary",
                      isActive && "bg-highlight text-primary"
                    )
                  }
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
            <li className="mt-2">
              <Button asChild className="w-full"><Link to="/contact?type=quote">{t("nav.quote")}</Link></Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
