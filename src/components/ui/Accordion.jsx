import { useRef, useState, useId } from 'react';
import { Plus } from 'lucide-react';
import { gsap } from '@/animations/gsapSetup';
import { useGSAP } from '@gsap/react';
import { cn } from '@/utils/helpers';

const AccordionItem = ({ question, answer, open, onToggle }) => {
  const bodyRef = useRef(null);
  const panelId = useId();

  useGSAP(() => {
    gsap.to(bodyRef.current, {
      height: open ? 'auto' : 0,
      opacity: open ? 1 : 0,
      duration: 0.55,
      ease: 'expo.inOut',
    });
  }, [open]);

  return (
    <div className="border-b border-ink-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-xl text-bone md:text-2xl">{question}</span>
        <Plus
          size={20}
          className={cn(
            'shrink-0 text-ember transition-transform duration-500 ease-out-expo',
            open && 'rotate-45',
          )}
          aria-hidden
        />
      </button>
      <div id={panelId} ref={bodyRef} className="h-0 overflow-hidden opacity-0">
        <p className="max-w-2xl pb-8 text-bone-muted">{answer}</p>
      </div>
    </div>
  );
};

/** Single-open FAQ accordion with GSAP height animation. */
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          {...item}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
