import { Link } from "react-router-dom";
import { Box } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Box className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">FlyBox</span>
        </Link>
      </div>
    </header>
  );
}