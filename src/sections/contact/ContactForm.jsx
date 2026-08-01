import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { packages } from '@/data/packages';

/**
 * Animated contact form: fields reveal with a stagger, validation via
 * react-hook-form. `submitBrief` in api/ is where a real endpoint goes.
 */
const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    const { submitBrief } = await import('@/api/contact');
    await submitBrief(data);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-ink-line bg-ink-soft p-10">
        <p className="font-display text-2xl text-bone">Brief received.</p>
        <p className="mt-3 text-bone-muted">
          We reply to every enquiry within one working day. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Reveal stagger={0.08} className="space-y-10">
        <Input
          label="Your name"
          placeholder="Ada Lovelace"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name', { required: 'We need a name to reply to.' })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="ada@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'An email is required.',
            pattern: { value: /.+@.+\..+/, message: 'That email doesn’t look right.' },
          })}
        />
        <div>
          <p className="mb-3 font-mono text-label uppercase text-bone-faint">Interested in</p>
          <div className="flex flex-wrap gap-4">
            {packages.map((pkg) => (
              <label key={pkg.id} className="flex cursor-pointer items-center gap-2 text-bone-muted">
                <input
                  type="radio"
                  value={pkg.name}
                  className="accent-ember"
                  {...register('package')}
                />
                {pkg.name}
              </label>
            ))}
            <label className="flex cursor-pointer items-center gap-2 text-bone-muted">
              <input type="radio" value="Not sure yet" defaultChecked className="accent-ember" {...register('package')} />
              Not sure yet
            </label>
          </div>
        </div>
        <Input
          as="textarea"
          label="Tell us about the project"
          placeholder="What are you making, and when does it need to exist?"
          rows={4}
          error={errors.message?.message}
          {...register('message', {
            required: 'A sentence or two helps us prepare.',
            minLength: { value: 20, message: 'A little more detail, please — 20 characters minimum.' },
          })}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send the brief'}
        </Button>
      </Reveal>
    </form>
  );
};

export default ContactForm;
