import Container from '@/components/ui/Container';
import logoImg from '@/assets/images/logo.png'; // adjust path/filename

const CONTACT_LINKS = [
  {
    label: 'Phone',
    value: '+91 9944582749',
    href: 'tel:+919944582749',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'hello@saromedia.works',
    href: 'mailto:hello@saromedia.works',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M3 5h18v14H3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 6l9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    value: '@saromediaworks',
    href: 'https://instagram.com/saromediaworks',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const Contact = () => (
  <section id="contact" className="py-section pt-0">
    <Container>
      <div className="flex flex-col items-center gap-8 text-center sm:gap-10 md:flex-row md:items-center md:justify-between md:text-left">
        {/* Left — logo, scales down on small screens so it never dominates */}
        <img
          src={logoImg}
          alt="Saro Media Works"
          className="h-16 w-auto sm:h-24 md:h-28 lg:h-32"
        />

        {/* Right — contact links */}
        <ul className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 md:justify-end md:gap-8">
          {CONTACT_LINKS.map(({ label, value, href, icon }) => (
            <li key={label} className="w-full sm:w-auto">
              <a
                href={href}
                target={label === 'Instagram' ? '_blank' : undefined}
                rel={label === 'Instagram' ? 'noreferrer' : undefined}
                className="group flex items-center justify-center gap-3 text-sm text-bone-muted transition-colors hover:text-ember sm:justify-start"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-line text-bone-faint transition-colors group-hover:border-ember group-hover:text-ember sm:h-12 sm:w-12">
                  {icon}
                </span>
                <span className="text-left">
                  <span className="block font-mono text-[14px] uppercase tracking-wide text-bone-faint">
                    {label}
                  </span>
                  <span className="break-all sm:break-normal text-[18px]">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);

export default Contact;