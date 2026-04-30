export function Footer() {
  return (
    <footer className="border-t py-8 text-center">
      <div className="container space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-foreground">Veelogg</span>
          {" "}&mdash; tools for creators who build.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Made with care for the creator community.
        </p>
      </div>
    </footer>
  );
}
