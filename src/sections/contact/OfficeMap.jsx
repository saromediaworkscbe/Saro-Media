import { MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { SITE } from '@/utils/constants';

/**
 * Google Maps placeholder: a styled stand-in with the exact footprint an
 * embed would occupy. Replace the inner div with an <iframe> embed and
 * keep the wrapper so layout and reveal are unchanged.
 */
const OfficeMap = () => (
  <Reveal>
    <div className="relative aspect-[4/3] overflow-hidden border border-ink-line bg-ink-soft">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(#1C1C1C 1px, transparent 1px), linear-gradient(90deg, #1C1C1C 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <MapPin size={28} className="text-ember" aria-hidden />
        <p className="max-w-56 text-sm text-bone-muted">{SITE.address}</p>
        <p className="font-mono text-label uppercase text-bone-faint">Map embed goes here</p>
      </div>
    </div>
  </Reveal>
);

export default OfficeMap;
