import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Shield, Clock, Eye, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-12">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">
                Ephemeral File Sharing
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Share files securely with automatic expiration. Upload once, share safely, files self-destruct.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/upload">
                  <Upload className="mr-2 h-5 w-5" />
                  Start Sharing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Private & Secure</CardTitle>
                <CardDescription>
                  Files are stored with unguessable URLs and automatically deleted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your files are protected with unique access tokens and removed from our servers automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Auto-Expiring</CardTitle>
                <CardDescription>
                  All files expire within 24 hours by default
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No permanent storage means no long-term privacy concerns. Files disappear automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-success" />
                </div>
                <CardTitle>One-Time View</CardTitle>
                <CardDescription>
                  Option to delete files immediately after first download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Perfect for sensitive documents that should only be seen once.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How it Works */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground mt-2">Simple, secure file sharing in three steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Upload File</h3>
                <p className="text-muted-foreground">
                  Drag & drop any file up to 50MB. Choose expiry settings.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Get Share Link</h3>
                <p className="text-muted-foreground">
                  Receive a secure link and QR code for easy sharing.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Auto-Delete</h3>
                <p className="text-muted-foreground">
                  File expires automatically for complete privacy protection.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 py-8 border-t">
            <h2 className="text-2xl font-bold">Ready to share securely?</h2>
            <Button asChild size="lg">
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Your First File
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
