import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/download': {
        target: 'https://oaqnnproqxxzkfwoxbmh.supabase.co/functions/v1/download-proxy',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/download/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Forward query parameters
            if (req.url) {
              const url = new URL(req.url, 'http://localhost');
              proxyReq.path = '/?' + url.searchParams.toString();
            }
          });
        }
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
