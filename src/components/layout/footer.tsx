export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-border/40">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Built by{" "}
          <a
            href="https://twitter.com/yuvanarvind"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            @yuvanarvind
          </a>
        </p>
      </div>
    </footer>
  );
};