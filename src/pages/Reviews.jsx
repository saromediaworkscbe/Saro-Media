import Seo from '@/components/ui/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';
import ReviewCard from '@/components/ui/ReviewCard';
import RatingSummary from '@/sections/reviews/RatingSummary';
import VideoTestimonials from '@/sections/reviews/VideoTestimonials';
import { reviews } from '@/data/reviews';

const Reviews = () => (
  <>
    <Seo title="Reviews" description="What clients say about working with Aether Studio — every review from a shipped project." />
    <PageHeader
      eyebrow={`${reviews.length} written · 3 on camera`}
      title="On the record"
      description="Every quote below is attributed, dated and tied to a project you can see in the archive. No anonymous praise."
    />
    <RatingSummary />
    <section className="overflow-hidden py-section">
      <Marquee duration={50}>
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.id} review={review} className="mx-3 w-[19rem] sm:w-[24rem]" />
        ))}
      </Marquee>
      <Marquee duration={50} reverse className="mt-6">
        {reviews.slice(3).map((review) => (
          <ReviewCard key={review.id} review={review} className="mx-3 w-[19rem] sm:w-[24rem]" />
        ))}
      </Marquee>
    </section>
    <VideoTestimonials />
    <Container className="pb-section">
      <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Reveal>
    </Container>
  </>
);

export default Reviews;
