import { FinalCta, Tribute } from '@/components/landing/ClosingSections';
import { Faq } from '@/components/landing/Faq';
import { GetInvolved } from '@/components/landing/GetInvolved';
import { Hero } from '@/components/landing/Hero';
import { HowToJoin } from '@/components/landing/HowToJoin';
import { CurrentSponsors } from '@/components/landing/CurrentSponsors';
import { RulesGlance } from '@/components/landing/RulesGlance';
import { Timeline } from '@/components/landing/Timeline';
import { Tracks } from '@/components/landing/Tracks';
import { Warmup } from '@/components/landing/Warmup';
import { WhatIsCtf } from '@/components/landing/WhatIsCtf';
import { WhyCtfarsi } from '@/components/landing/WhyCtfarsi';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsCtf />
      <WhyCtfarsi />
      <Tracks />
      <HowToJoin />
      <Timeline />
      <RulesGlance />
      <CurrentSponsors />
      <GetInvolved />
      <Warmup />
      <Faq />
      <Tribute />
      <FinalCta />
    </>
  );
}
