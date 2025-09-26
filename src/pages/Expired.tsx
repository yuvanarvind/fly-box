import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Upload } from "lucide-react";

export default function Expired() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning/10 mb-4">
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
            <h1 className="text-3xl font-bold">This link has expired</h1>
            <p className="text-muted-foreground">
              This file link has either expired or was already viewed
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Link No Longer Available</CardTitle>
              <CardDescription>
                Files shared through FlyBox are temporary and self-destruct for privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Why did this happen?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• The file was set to delete after first view and has been downloaded</li>
                  <li>• The 24-hour expiration period has passed</li>
                  <li>• The file was manually removed by the uploader</li>
                </ul>
              </div>

              <div className="text-center">
                <Button asChild size="lg">
                  <Link to="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Create your own secure link
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}