import Container from '@/components/ui/Container';
import SectionTitle from '@/components/ui/SectionTitle';
import Marquee from '@/components/ui/Marquee';
import ReviewCard from '@/components/ui/ReviewCard';
import Reveal from '@/components/ui/Reveal';
import RatingSummary from '@/sections/reviews/RatingSummary';
import VideoTestimonials from '@/sections/reviews/VideoTestimonials';
import { reviews } from '@/data/reviews';

/** Reviews, folded into the one-page flow: same content as the old /reviews page. */
const ReviewsPreview = () => (
  <section id="reviews" className="border-t border-ink-line">
    <Container className="pb-10 pt-section">
      <SectionTitle eyebrow="Client reviews" title="Kind words, on the record" />
    </Container>
    <Reveal as="div" variant="clip" className="overflow-hidden">
      <Marquee duration={45}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} className="mx-3 w-[19rem] sm:w-[24rem]" />
        ))}
      </Marquee>
    </Reveal>
    {/* <VideoTestimonials /> */}
  </section>
);

export default ReviewsPreview;
