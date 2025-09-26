import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Shield, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container max-w-6xl py-16 md:py-24 lg:py-32 px-4 md:px-6 relative">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Bank-grade encryption
          </div>
          
          <div className="space-y-4 md:space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Share Files That
              <span className="block text-primary">Self-Destruct</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              The most secure way to share sensitive files. Upload once, share safely, and watch files disappear automatically. No permanent storage, no privacy concerns.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-md sm:max-w-none">
            <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
              <Link to="/upload">
                <Upload className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Start Sharing Now
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-6 border-2 hover:bg-accent/50 w-full sm:w-auto">
              <Link to="/upload">
                <Zap className="mr-2 h-4 w-4" />
                See How It Works
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-sm text-muted-foreground">
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