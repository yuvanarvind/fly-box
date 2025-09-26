import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QRCodeComponent } from "@/components/ui/qr-code";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, Upload, FileText, Clock, Eye } from "lucide-react";

interface LinkData {
  filename: string;
  size_bytes: number;
  first_view: boolean;
  expires_at: string;
}

export default function Success() {
  const { token } = useParams<{ token: string }>();
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const shareUrl = token ? `https://snap-drop.lovable.app/${token}` : "";

  useEffect(() => {
    const fetchLinkData = async () => {
      if (!token) return;

      try {
        const { data, error } = await supabase
          .from("links")
          .select("filename, size_bytes, first_view, expires_at")
          .eq("access_token", token)
          .single();

        if (error) throw error;
        setLinkData(data);
      } catch (error) {
        console.error("Failed to fetch link data:", error);
        toast({
          title: "Error",
          description: "Failed to load file information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLinkData();
  }, [token, toast]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Copied!",
        description: "Share link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatExpiryTime = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diffMs = expiry.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl py-12">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!linkData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl py-12">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Link not found</h1>
            <p className="text-muted-foreground">The requested file link could not be found.</p>
            <Button asChild>
              <Link to="/upload">Upload a file</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <FileText className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold">Your link is ready</h1>
            <p className="text-muted-foreground">
              Share this link to give others access to your file
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
              <CardDescription>
                {linkData.filename} • {formatFileSize(linkData.size_bytes)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {linkData.first_view ? (
                    <>
                      <Eye className="h-4 w-4 text-warning" />
                      <span className="text-sm">Deletes after first view</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Expires in {formatExpiryTime(linkData.expires_at)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Share Link</label>
                <div className="flex space-x-2">
                  <Input value={shareUrl} readOnly />
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border">
                  <QRCodeComponent value={shareUrl} size={160} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild variant="outline">
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open link
                  </a>
                </Button>
                <Button asChild>
                  <Link to="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload another file
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