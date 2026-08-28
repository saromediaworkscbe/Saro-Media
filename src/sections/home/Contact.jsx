import Container from '@/components/ui/Container';
import logoImg from '@/assets/images/logo.png'; // adjust path/filename

const CONTACT_LINKS = [
  {
    label: 'Phone',
    value: '+91 9944582749',
    href: 'tel:+919944582749',
    nowrap: true,
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
    value: 'saromediaworkscbe@gmail.com',
    href: 'mailto:saromediaworkscbe@gmail.com',
    nowrap: false,
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
    href: 'https://www.instagram.com/saro_mediaworks/',
    nowrap: true,
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
      <div className="flex flex-col items-center gap-10 text-center md:grid md:grid-cols-[auto,1fr] md:items-center md:gap-12 md:text-left">
        {/* Left — logo, fixed column so it never pushes the links around */}
        <img
          src={logoImg}
          alt="Saro Media Works"
          className="h-16 w-auto shrink-0 sm:h-24 md:h-28 lg:h-32"
        />

        {/* Right — contact links */}
        <ul className="flex w-full flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-8 md:justify-end">
          {CONTACT_LINKS.map(({ label, value, href, icon, nowrap }) => (
            <li key={label} className="flex w-full justify-center sm:w-auto sm:justify-start">
              <a
                href={href}
                target={label === 'Instagram' ? '_blank' : undefined}
                rel={label === 'Instagram' ? 'noreferrer' : undefined}
                className="group flex items-center gap-3 text-sm text-bone-muted transition-colors hover:text-ember"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line text-bone-faint transition-colors group-hover:border-ember group-hover:text-ember sm:h-12 sm:w-12">
                  {icon}
                </span>
                <span className="flex flex-col text-left leading-tight">
                  <span className="font-mono text-[13px] uppercase tracking-wide text-bone-faint">
                    {label}
                  </span>
                  <span className={`text-[17px] sm:text-[18px] ${nowrap ? 'whitespace-nowrap' : 'break-all sm:break-normal'}`}>
                    {value}
                  </span>
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