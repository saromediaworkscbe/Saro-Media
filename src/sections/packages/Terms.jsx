import { Clock, PlusCircle, UserCheck, Image as ImageIcon, MapPin, Compass, ShieldCheck, CreditCard } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { packageTerms, paymentTerms } from '@/data/packages';

const iconMap = {
  Clock: Clock,
  PlusCircle: PlusCircle,
  UserCheck: UserCheck,
  Image: ImageIcon,
  MapPin: MapPin,
  Compass: Compass,
};

const Terms = () => {
  return (
    <section className="py-section border-t border-ink-line/40" id="terms">
      <Container>
        <SectionTitle
          eyebrow="Terms & Conditions"
          title="Package & Payment Terms"
          className="mb-14"
        />

        {/* Payment Terms Section */}
        <div className="mb-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 text-ember">
              <CreditCard size={20} />
              <h3 className="font-display text-xl text-bone">Payment Terms</h3>
            </div>
          </Reveal>

          <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {paymentTerms.map((term) => (
              <div
                key={term.step}
                className={`relative flex flex-col justify-between p-6 transition-all duration-300 sm:p-8 ${
                  term.highlight
                    ? 'bg-ink-soft border border-ember/30'
                    : 'bg-ink-soft/40 border border-ink-line'
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-bone-faint">{term.step}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-ember">
                    Milestone
                  </span>
                </div>

                <div className="my-6">
                  <div className="font-display text-4xl font-semibold text-bone sm:text-5xl">
                    {term.percentage}
                  </div>
                  <h4 className="mt-2 font-display text-lg text-bone">{term.title}</h4>
                  <p className="mt-2 text-sm text-bone-muted leading-relaxed">
                    {term.description}
                  </p>
                </div>

                {term.highlight && (
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-ember" />
                )}
              </div>
            ))}
          </Reveal>
        </div>

        {/* Package Terms Section */}
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-2 text-ember">
              <ShieldCheck size={20} />
              <h3 className="font-display text-xl text-bone">Package Terms</h3>
            </div>
          </Reveal>

          <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packageTerms.map((term) => {
              const IconComponent = iconMap[term.icon] || ShieldCheck;
              return (
                <div
                  key={term.id}
                  className="group relative flex flex-col justify-between border border-ink-line bg-ink-soft/30 p-6 transition-colors duration-300 hover:border-ember/40 hover:bg-ink-soft/60"
                >
                  <div>
                    <div className="mb-4 inline-flex items-center justify-center rounded-sm bg-ember/10 p-2.5 text-ember transition-colors duration-300 group-hover:bg-ember group-hover:text-ink">
                      <IconComponent size={20} />
                    </div>
                    <h4 className="font-display text-lg text-bone mb-2">{term.title}</h4>
                    <p className="text-sm text-bone-muted leading-relaxed">{term.description}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default Terms;
