import { ArrowUpRight } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Grid from '@/components/ui/Grid';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/sections/contact/ContactForm';
import OfficeMap from '@/sections/contact/OfficeMap';
import { SITE } from '@/utils/constants';

const Contact = () => (
  <>
    <Seo title="Contact" description="Start a project with Aether Studio. We reply to every enquiry within one working day." />
    <PageHeader
      eyebrow="Say hello"
      title="Start something"
      description="Tell us what you're making. We read every brief ourselves and reply within one working day."
    />
    <Container className="pb-section">
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <ContactForm />
        </div>
        <aside className="col-span-4 space-y-12 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <OfficeMap />
          <Reveal>
            <p className="mb-4 font-mono text-label uppercase text-bone-faint">Office</p>
            <address className="not-italic leading-relaxed text-bone-muted">
              {SITE.address}
              <br />
              <a href={`mailto:${SITE.email}`} className="mt-2 inline-block text-bone hover:text-ember">
                {SITE.email}
              </a>
              <br />
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="text-bone-muted hover:text-bone">
                {SITE.phone}
              </a>
            </address>
          </Reveal>
          <Reveal>
            <p className="mb-4 font-mono text-label uppercase text-bone-faint">Elsewhere</p>
            <ul className="space-y-2">
              {SITE.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-bone-muted transition-colors hover:text-bone"
                  >
                    {social.label}
                    <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </Grid>
    </Container>
  </>
);

export default Contact;
