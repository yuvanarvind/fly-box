import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Shield, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container max-w-6xl py-24 md:py-32 relative">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Bank-grade encryption
          </div>
          
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Share Files That
              <span className="block text-primary">Self-Destruct</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The most secure way to share sensitive files. Upload once, share safely, and watch files disappear automatically. No permanent storage, no privacy concerns.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Start Sharing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-accent/50">
              <Zap className="mr-2 h-4 w-4" />
              See How It Works
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              No registration required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Files up to 50MB
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Automatic expiry
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};