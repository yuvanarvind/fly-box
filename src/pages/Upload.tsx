import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { Clock, Eye, Lock } from "lucide-react";
import bcrypt from "bcryptjs";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firstView, setFirstView] = useState(false);
  const [password, setPassword] = useState("");
  const [expiryType, setExpiryType] = useState<"hours" | "days">("hours");
  const [expiryValue, setExpiryValue] = useState(24);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Calculate expiry date based on user selection
      const expiryDate = new Date();
      const maxHours = 7 * 24; // 7 days maximum
      const totalHours = expiryType === "days" ? expiryValue * 24 : expiryValue;
      
      // Ensure we don't exceed 7 days
      const finalHours = Math.min(totalHours, maxHours);
      expiryDate.setHours(expiryDate.getHours() + finalHours);

      // Generate unique paths and tokens
      const fileId = uuidv4();
      const objectPath = `${fileId}/${selectedFile.name}`;
      
      console.log("Uploading file:", selectedFile.name, "Size:", selectedFile.size);
      console.log("Object path:", objectPath);
      
      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("ephemeral")
        .upload(objectPath, selectedFile);

      console.log("Upload result:", uploadData);
      console.log("Upload error:", uploadError);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Hash password if provided
      let passwordHash = null;
      if (password.trim()) {
        passwordHash = await bcrypt.hash(password.trim(), 10);
      }

      // Insert metadata into database with custom expiry
      const { data, error: dbError } = await supabase
        .from("links")
        .insert({
          object_path: objectPath,
          filename: selectedFile.name,
          size_bytes: selectedFile.size,
          mime_type: selectedFile.type,
          first_view: firstView,
          password_hash: passwordHash,
          expires_at: expiryDate.toISOString(),
        })
        .select("access_token")
        .single();

      console.log("Database insert result:", data);
      console.log("Database insert error:", dbError);

      if (dbError) {
        // Clean up uploaded file if link creation fails
        await supabase.storage.from("ephemeral").remove([objectPath]);
        throw new Error(`Failed to create link: ${dbError.message}`);
      }

      // Navigate to success page
      navigate(`/success/${data.access_token}`);
      
      toast({
        title: "File uploaded successfully!",
        description: "Your share link has been generated.",
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Share a file that self-destructs
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload any file and get a secure link that expires automatically
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Select a file to create a temporary sharing link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                value={selectedFile}
                onClear={handleClearFile}
                disabled={isUploading}
              />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password (Optional)</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password to protect this file"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isUploading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no password protection
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Expiry Time</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max={expiryType === "days" ? "7" : "168"}
                      value={expiryValue}
                      onChange={(e) => setExpiryValue(Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={isUploading}
                      className="flex-1"
                    />
                    <Select
                      value={expiryType}
                      onValueChange={(value: "hours" | "days") => {
                        setExpiryType(value);
                        // Adjust value if switching to days and current value is too high
                        if (value === "days" && expiryValue > 7) {
                          setExpiryValue(7);
                        }
                        // Adjust value if switching to hours and current value would exceed 7 days
                        if (value === "hours" && expiryValue > 168) {
                          setExpiryValue(168);
                        }
                      }}
                      disabled={isUploading}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum expiry time is 7 days (168 hours)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="first-view"
                    checked={firstView}
                    onCheckedChange={(checked) => setFirstView(checked as boolean)}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="first-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Delete after first view
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  If checked, the file will be deleted immediately after the first download.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Custom expiry (up to 7 days)</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>Optional first-view deletion</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Optional password protection</span>
                </div>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full"
                size="lg"
              >
                {isUploading ? "Uploading..." : "Upload & generate link"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}