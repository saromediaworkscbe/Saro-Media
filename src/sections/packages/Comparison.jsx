import { Check, Minus } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { packages, comparisonRows } from '@/data/packages';

const Cell = ({ value }) => {
  if (value === true) return <Check size={16} className="mx-auto text-ember" aria-label="Included" />;
  if (value === false) return <Minus size={16} className="mx-auto text-bone-faint" aria-label="Not included" />;
  return <span className="text-sm text-bone-muted">{value}</span>;
};

const Comparison = () => (
  <section className="py-section">
    <Container>
      <SectionTitle eyebrow="Side by side" title="Compare the packages" className="mb-14" />
      <Reveal>
        <div className="overflow-x-auto no-scrollbar scrollbar-none" data-lenis-prevent>
          <table className="w-full min-w-[640px] border-collapse text-center">
            <thead>
              <tr className="border-b border-ink-line">
                <th scope="col" className="py-4 text-left font-mono text-label uppercase text-bone-faint">
                  Includes
                </th>
                {packages.map((pkg) => (
                  <th scope="col" key={pkg.id} className="py-4 font-display text-lg text-bone">
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-ink-line/60">
                  <th scope="row" className="py-4 text-left text-sm font-normal text-bone-muted">
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={packages[i]?.id || i} className="py-4">
                      <Cell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default Comparison;
