import { Instagram, MapPin, BookMarked } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PhotoFrame } from "@/components/beyond/PhotoFrame";
import { personal } from "@/data/content";

export const Lightbox = ({ item, onClose }) => (
  <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-h-[92vh] w-[94vw] max-w-5xl overflow-y-auto border-espresso/10 bg-cream p-0 sm:rounded-[28px]" data-lenis-prevent data-testid="interest-lightbox">
      {item && (
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="bg-espresso p-4 md:col-span-3">
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-beige">
              <PhotoFrame src={item.photo} alt={item.alt} className="object-contain" />
            </div>
            {item.gallery?.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {item.gallery.map((g) => <div key={g} className="aspect-square overflow-hidden rounded-lg"><PhotoFrame src={g} alt={item.alt} /></div>)}
              </div>
            )}
          </div>
          <div className="p-7 md:col-span-2 md:p-9">
            <p className="eyebrow">{item.num} · {item.tag}</p>
            <DialogTitle className="mt-4 font-serif text-4xl font-normal leading-tight text-espresso">{item.title}</DialogTitle>
            <DialogDescription className="mt-4 text-base leading-relaxed text-espresso/85">{item.desc}</DialogDescription>
            <p className="mt-6 -rotate-2 font-hand text-2xl text-terra">{item.note}</p>
            {item.destinations?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">{item.destinations.map((d) => <li key={d} className="chip"><MapPin className="h-3 w-3 text-terra" />{d}</li>)}</ul>
            )}
            {item.books?.length > 0 && (
              <ul className="mt-6 space-y-2">{item.books.map((b) => <li key={b} className="flex items-center gap-2 text-sm"><BookMarked className="h-4 w-4 text-terra" />{b}</li>)}</ul>
            )}
            {item.link && (
              <a href={personal[item.link.key]} target="_blank" rel="noreferrer" className="btn-ghost mt-8" data-testid="lightbox-instagram-link"><Instagram className="h-4 w-4" />{item.link.label}</a>
            )}
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);
