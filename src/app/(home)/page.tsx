import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Zap, Shield, Users, ArrowRight, CheckCircle } from "lucide-react";

export default async function HomePage() {
  return (
    <>
      <section className="from-primary to-secondary relative bg-gradient-to-br py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-primary-foreground mb-6 text-4xl font-bold md:text-6xl">
              Cloud Storage{" "}
              <span className="text-accent-foreground bg-accent rounded px-2">
                Made Simple
              </span>
            </h1>
            <p className="text-primary-foreground/90 mb-8 text-xl leading-relaxed md:text-2xl">
              Store, sync, and share your files effortlessly. LPX DRIVE is
              designed to be so simple, anyone can use it from day one.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-primary-foreground/70 mt-4 text-sm">
              No credit card required • Free during beta
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Why LPX DRIVE?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              We believe cloud storage should be simple, secure, and accessible
              to everyone
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="bg-card border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-2xl p-4">
                  <Zap className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-card-foreground text-xl font-bold">
                  Effortlessly Simple
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  {`Drag, drop, done. No complex setup, no confusing menus. Just
                  upload your files and they're instantly available everywhere.`}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="bg-accent/10 mx-auto mb-4 w-fit rounded-2xl p-4">
                  <Shield className="text-accent h-8 w-8" />
                </div>
                <CardTitle className="text-card-foreground text-xl font-bold">
                  Secure by Default
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  Your files are encrypted and protected without you having to
                  think about it. Security that works behind the scenes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-4 text-center">
                <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-2xl p-4">
                  <Users className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="text-card-foreground text-xl font-bold">
                  Share Instantly
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  Share files with a single click. No complicated permissions or
                  settings - just simple, instant sharing.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h3 className="text-foreground mb-6 text-2xl font-bold">
              Built for Everyone
            </h3>
            <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg">
              {`Whether you're a student, professional, or team - LPX DRIVE adapts
              to how you work`}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-3 flex items-center justify-center">
                <CheckCircle className="text-accent mr-2 h-5 w-5" />
                <span className="text-foreground font-medium">
                  No Learning Curve
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {`Works exactly how you'd expect`}
              </p>
            </div>

            <div className="text-center">
              <div className="mb-3 flex items-center justify-center">
                <CheckCircle className="text-accent mr-2 h-5 w-5" />
                <span className="text-foreground font-medium">
                  Cross-Platform
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Access from any device, anywhere
              </p>
            </div>

            <div className="text-center">
              <div className="mb-3 flex items-center justify-center">
                <CheckCircle className="text-accent mr-2 h-5 w-5" />
                <span className="text-foreground font-medium">
                  Always Synced
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Latest version, every time
              </p>
            </div>

            <div className="text-center">
              <div className="mb-3 flex items-center justify-center">
                <CheckCircle className="text-accent mr-2 h-5 w-5" />
                <span className="text-foreground font-medium">
                  Free During Beta
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Full access while we perfect it
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-primary-foreground mb-6 text-3xl font-bold md:text-4xl">
            Ready to simplify your files?
          </h2>
          <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-xl">
            Join our beta and experience cloud storage the way it should be -
            simple, secure, and just works.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-primary-foreground/70 mt-4 text-sm">
            Beta access • No credit card • Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
}
