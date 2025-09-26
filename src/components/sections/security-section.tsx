import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Trash2, Server, Key } from "lucide-react";

export const SecuritySection = () => {
  return (
    <section id="security" className="py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="container max-w-6xl">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-sm font-medium text-success">
            <Shield className="h-4 w-4" />
            Military-Grade Security
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Your Files Are{" "}
            <span className="text-primary">Ultra-Secure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've built FlyBox with privacy-first principles. Your files are protected at every step, from upload to automatic deletion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>End-to-End Encryption</CardTitle>
              <CardDescription>
                Files are encrypted in transit and at rest using AES-256
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your files are encrypted before they leave your device and remain encrypted on our servers. We can't access your content even if we wanted to.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Key className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Unguessable URLs</CardTitle>
              <CardDescription>
                Share links use cryptographically secure random tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each file gets a unique, unguessable URL with 128-bit entropy. It's virtually impossible for anyone to stumble upon your files.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle>Automatic Deletion</CardTitle>
              <CardDescription>
                Files are permanently deleted after expiry or viewing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No permanent storage means no long-term security risks. Files are wiped from our servers automatically and can't be recovered.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Eye className="h-6 w-6 text-success" />
              </div>
              <CardTitle>One-Time Access</CardTitle>
              <CardDescription>
                Optional single-view protection for maximum security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enable one-time viewing to ensure your sensitive files are destroyed immediately after the first download.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Server className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Zero Knowledge</CardTitle>
              <CardDescription>
                We never see your file contents or metadata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Files are encrypted client-side before upload. We only store encrypted blobs and can't see filenames, content, or any metadata.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-neutral-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-neutral-700" />
              </div>
              <CardTitle>Password Protection</CardTitle>
              <CardDescription>
                Add an extra layer of security with custom passwords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Protect your files with bcrypt-hashed passwords. Even with the share link, files remain inaccessible without the password.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};