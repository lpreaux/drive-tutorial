import { ArrowRight, Cloud } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Cloud className="text-primary mr-3 h-8 w-8" />
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl font-bold">
                  LPX DRIVE
                </span>
                <span className="bg-accent/10 text-accent rounded-full px-2 py-1 text-xs font-medium">
                  BETA
                </span>
              </div>
            </div>
            {/* This renders immediately with no loading state */}
            <div className="flex items-center gap-4">
              <SignedOut>
                <Link href="/sign-in">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/drive">
                  <Button
                    variant="ghost"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Back to my Files
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-card border-border border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center md:mb-0">
              <Cloud className="text-primary mr-2 h-6 w-6" />
              <span className="text-primary text-lg font-bold">LPX DRIVE</span>
              <span className="bg-accent/10 text-accent ml-2 rounded-full px-2 py-1 text-xs font-medium">
                BETA
              </span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              Simple cloud storage for everyone
            </p>
          </div>
          <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
            <p>&copy; 2024 LPX DRIVE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
