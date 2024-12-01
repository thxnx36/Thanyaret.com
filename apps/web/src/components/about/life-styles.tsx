import ServiceItem from './service-item';
import AboutHeader from '@/components/about/about-header';

import type { LifeStyle } from '@/types/about';

interface LifeStylesProps {
  lifestyles: LifeStyle[];
}

const LifeStyles: React.FC<LifeStylesProps> = ({ lifestyles }) => {
  return (
    <section>
      <AboutHeader text="$ ls -al Life Style" />
      <ul className="service-list mt-[30px] grid grid-cols-2 gap-[20px] lg:gap-y-[20px] lg:gap-x-[25px]">
        {lifestyles.map((lifestyle: LifeStyle) => (
          <ServiceItem lifestyle={lifestyle} key={lifestyle.title} />
        ))}
      </ul>
    </section>
  );
}

export default LifeStyles;
