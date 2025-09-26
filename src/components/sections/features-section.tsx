import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, Eye, Upload, Download, Trash2 } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container max-w-6xl">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need for{" "}
            <span className="text-primary">Secure Sharing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            FlyBox combines simplicity with enterprise-grade security. No accounts, no tracking, just secure file sharing that works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:animate-float">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Military-Grade Security</CardTitle>
              <CardDescription>
                Bank-level encryption protects your files at every step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your files are encrypted with AES-256 before they leave your device. Even we can't see what you're sharing.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 group-hover:animate-float">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Smart Auto-Expiry</CardTitle>
              <CardDescription>
                Choose your expiry time from 1 hour to 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Set custom expiration times or use our intelligent defaults. Files are permanently deleted when they expire.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:animate-float">
                <Eye className="h-6 w-6 text-success" />
              </div>
              <CardTitle>One-Time Viewing</CardTitle>
              <CardDescription>
                Ultimate security with single-use links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enable one-time viewing for maximum security. Files are destroyed immediately after the first download.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center mb-4 group-hover:animate-float">
                <Upload className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Drag & Drop Upload</CardTitle>
              <CardDescription>
                Upload any file up to 50MB instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple drag-and-drop interface works with any file type. No software to install, works in any browser.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-neutral-200 flex items-center justify-center mb-4 group-hover:animate-float">
                <Download className="h-6 w-6 text-neutral-700" />
              </div>
              <CardTitle>Instant Access</CardTitle>
              <CardDescription>
                Recipients get files immediately with one click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No sign-ups or accounts needed. Share the link and recipients can download instantly from any device.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:animate-float">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Zero Trace</CardTitle>
              <CardDescription>
                Files are completely wiped from our servers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                When files expire, they're permanently deleted and can't be recovered. Your privacy is guaranteed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};