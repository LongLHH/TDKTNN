import IntroSection from '../components/IntroSection';
import TimelineSection from '../components/TimelineSection';
import TwoWayRelationSection from '../components/TwoWayRelationSection';
import MindMapSection from '../components/MindMapSection';
import ScenariosSection from '../components/ScenariosSection';
import SummarySection from '../components/SummarySection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="w-full">
      <IntroSection />
      <TimelineSection />
      <TwoWayRelationSection />
      <MindMapSection />
      <ScenariosSection />
      <SummarySection />
      <Footer />
    </div>
  );
};

export default HomePage;
