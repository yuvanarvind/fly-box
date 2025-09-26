import { Upload, Share, Clock, Trash2, ArrowDown } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="container max-w-6xl">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure file sharing made simple. Just three steps to completely private, temporary file sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="text-center space-y-6 group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Upload Your File</h3>
              <p className="text-muted-foreground">
                Drag & drop any file up to 50MB. Set your expiry time and optional password protection.
              </p>
            </div>
            {/* Arrow for desktop */}
            <div className="hidden lg:block absolute top-10 left-full transform -translate-y-1/2 -translate-x-4">
              <ArrowDown className="h-6 w-6 text-muted-foreground rotate-90" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-6 group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Share className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Get Share Link</h3>
              <p className="text-muted-foreground">
                Instantly receive a secure, unguessable link and QR code to share with anyone.
              </p>
            </div>
            {/* Arrow for desktop */}
            <div className="hidden lg:block absolute top-10 left-full transform -translate-y-1/2 -translate-x-4">
              <ArrowDown className="h-6 w-6 text-muted-foreground rotate-90" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-6 group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Recipients Access</h3>
              <p className="text-muted-foreground">
                Recipients click the link to securely download your file. No accounts needed.
              </p>
            </div>
            {/* Arrow for desktop */}
            <div className="hidden lg:block absolute top-10 left-full transform -translate-y-1/2 -translate-x-4">
              <ArrowDown className="h-6 w-6 text-muted-foreground rotate-90" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center space-y-6 group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Trash2 className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Auto-Delete</h3>
              <p className="text-muted-foreground">
                Files are permanently deleted when they expire or after first view. Zero trace left behind.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 rounded-full text-success font-medium">
            <Clock className="h-5 w-5" />
            Average process time: Under 30 seconds
          </div>
        </div>
      </div>
    </section>
  );
};