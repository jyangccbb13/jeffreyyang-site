// Fixed, full-viewport ambient glow behind all page content. Three blurred,
// slowly drifting gradient blobs in the accent/blue/violet family. Pure CSS
// (see .aurora-* in globals.css) so it costs nothing beyond paint, and backs
// off automatically under prefers-reduced-motion.
export default function AuroraBackground() {
  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="aurora-blob aurora-blob-a" />
      <div className="aurora-blob aurora-blob-b" />
      <div className="aurora-blob aurora-blob-c" />
    </div>
  );
}
