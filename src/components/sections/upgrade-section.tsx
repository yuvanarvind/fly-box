import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Crown, Zap, Star, Check, Mail } from "lucide-react";

export const UpgradeSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission - in real app, this would save to database
    setTimeout(() => {
      toast({
        title: "Interest registered!",
        description: "Thanks for your interest. We'll reach out soon with early access.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-warning/5">
      <div className="container max-w-6xl">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-full text-sm font-medium text-warning">
            <Crown className="h-4 w-4" />
            Coming Soon
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready for{" "}
            <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
              Premium Features?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our waitlist for FlyBox Pro and get early access to advanced security features, larger file limits, and priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <Star className="h-6 w-6 text-warning" />
                What's Coming in Pro
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Files up to 500MB</p>
                    <p className="text-sm text-muted-foreground">Share large videos, presentations, and datasets</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Custom expiry times</p>
                    <p className="text-sm text-muted-foreground">Set files to expire in minutes, hours, days, or weeks</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Download analytics</p>
                    <p className="text-sm text-muted-foreground">See when and where your files are accessed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Bulk file sharing</p>
                    <p className="text-sm text-muted-foreground">Upload and share multiple files at once</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Priority support</p>
                    <p className="text-sm text-muted-foreground">Get help when you need it most</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
              <CardDescription>
                Be the first to know when FlyBox Pro launches
              </CardDescription>
              <Badge variant="secondary" className="mx-auto">
                <Mail className="h-3 w-3 mr-1" />
                Early Access
              </Badge>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-center"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-warning hover:shadow-lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We'll only contact you about FlyBox Pro updates. No spam, ever.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};