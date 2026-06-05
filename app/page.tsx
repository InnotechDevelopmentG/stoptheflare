import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import ConditionGrid from '@/components/home/ConditionGrid';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewsletterCTA from '@/components/home/NewsletterCTA';
import RecentArticles from '@/components/home/RecentArticles';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ConditionGrid />
      <HowItWorks />
      <Testimonials />
      <FeaturedProducts />
      <NewsletterCTA />
      <RecentArticles />
    </>
  );
}
