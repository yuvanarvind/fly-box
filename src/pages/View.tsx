import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Clock, Eye } from "lucide-react";

interface LinkData {
  id: string;
  object_path: string;
  filename: string;
  size_bytes: number;
  first_view: boolean;
  viewed_at: string | null;
  expires_at: string;
}

export default function View() {
  const { token } = useParams<{ token: string }>();
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLinkData = async () => {
      if (!token) return;

      try {
        const { data, error } = await supabase
          .from("links")
          .select("*")
          .eq("access_token", token)
          .single();

        if (error) {
          setIsExpired(true);
          return;
        }

        const now = new Date();
        const expiresAt = new Date(data.expires_at);

        // Check if expired by time
        if (now > expiresAt) {
          setIsExpired(true);
          return;
        }

        // Check if expired by first view
        if (data.first_view && data.viewed_at) {
          setIsExpired(true);
          return;
        }

        setLinkData(data);
      } catch (error) {
        console.error("Failed to fetch link data:", error);
        setIsExpired(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkData();
  }, [token]);

  const handleDownload = async () => {
    if (!linkData) return;

    setIsDownloading(true);

    try {
      // If first view, mark as viewed immediately
      if (linkData.first_view) {
        const { error: updateError } = await supabase
          .from("links")
          .update({
            viewed_at: new Date().toISOString(),
            expires_at: new Date().toISOString(), // Expire immediately
          })
          .eq("id", linkData.id);

        if (updateError) {
          console.error("Failed to update view status:", updateError);
        }
      }

      // Get download URL
      const { data: urlData, error: urlError } = await supabase.storage
        .from("ephemeral")
        .createSignedUrl(linkData.object_path, 60);

      console.log("Creating signed URL for:", linkData.object_path);
      console.log("URL Data:", urlData);
      console.log("URL Error:", urlError);

      if (urlError) {
        throw new Error(`Failed to create download URL: ${urlError.message}`);
      }

      if (urlData?.signedUrl) {
        // Create temporary download link
        const link = document.createElement("a");
        link.href = urlData.signedUrl;
        link.download = linkData.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Delete file from storage if first view
        if (linkData.first_view) {
          await supabase.storage
            .from("ephemeral")
            .remove([linkData.object_path]);
        }

        toast({
          title: "Download started",
          description: "Your file download has begun",
        });

        // If first view, redirect to expired page after a delay
        if (linkData.first_view) {
          setTimeout(() => {
            setIsExpired(true);
          }, 1000);
        }
      } else {
        throw new Error("Failed to generate download URL");
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
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

  if (isExpired || !linkData) {
    return <Navigate to="/expired" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">This file is available to download</h1>
            <p className="text-muted-foreground">
              Click the download button below to access the file
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{linkData.filename}</CardTitle>
              <CardDescription>
                File size: {formatFileSize(linkData.size_bytes)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {linkData.first_view ? (
                    <>
                      <Eye className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium text-warning">
                        This file will be deleted after download
                      </span>
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

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Downloading..." : "Download File"}
              </Button>

              {linkData.first_view && (
                <p className="text-xs text-muted-foreground text-center">
                  ⚠️ This is a one-time download. The file will be permanently deleted after you download it.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}