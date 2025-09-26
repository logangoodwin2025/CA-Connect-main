
'use client';

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Home, Users, MessageSquare, Network, Vote, Share2, Menu, Settings, Copy, ArrowLeft } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CampaignLogo } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const baseNavItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/contacts", icon: Users, label: "My Network" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
];

const candidateNavItems = [
    ...baseNavItems,
    { href: "/network/tree", icon: Network, label: "Network Tree" },
    { href: "/polling", icon: Vote, label: "Polling Day" },
];

const campaignerNavItems = [
    ...baseNavItems,
    { href: "/polling", icon: Vote, label: "Polling Day" },
];


function AppLayoutContent({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'campaigner';

  const navItems = role === 'candidate' ? candidateNavItems : campaignerNavItems;

  const appendRoleToHref = (href: string) => `${href}?role=${role}`;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 glass-subtle md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <CampaignLogo className="h-6 w-6 text-primary" />
              <span className="">CA Connect</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={appendRoleToHref(item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 glass-subtle px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href={appendRoleToHref('/dashboard')}
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <CampaignLogo className="h-6 w-6 text-primary" />
                  <span className="sr-only">CA Connect</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={appendRoleToHref(item.href)}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             <h1 className="text-lg md:text-xl font-semibold">{pageTitle}</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background glass-subtle">
          {children}
        </main>
      </div>
    </div>
  );
}

export function AppLayout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppLayoutContent children={children} pageTitle={pageTitle} />
    </Suspense>
  );
}
