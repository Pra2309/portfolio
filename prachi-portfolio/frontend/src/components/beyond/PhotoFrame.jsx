import { useState } from "react";
import { ImageIcon } from "lucide-react";

// Shows the real photo; if the file is missing, an elegant replaceable placeholder.
export const PhotoFrame = ({ src, alt, className = "", label, position }) => {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#E7D9C6_0_10px,#EADDCB_10px_20px)] text-center ${className}`} data-testid="photo-placeholder">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/80"><ImageIcon className="h-5 w-5 text-caramel" /></span>
        <span className="font-hand text-2xl text-espresso/70">{label || "photo on its way"}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} style={position ? { objectPosition: position } : undefined} className={`h-full w-full object-cover saturate-[0.95] ${className}`} />;
};
