import FlipCardSection from '../components/FlipCardSection';
import ScratchCardsSection from '../components/ScratchCardsSection';
import DragDropSection from '../components/DragDropSection';
import ConnectingDotsSection from '../components/ConnectingDotsSection';
import MindMapSection from '../components/MindMapSection';
import SummarySection from '../components/SummarySection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="w-full">
  <FlipCardSection />
  <ScratchCardsSection />
  <DragDropSection />
  <ConnectingDotsSection />
  <MindMapSection />
  <SummarySection />
      <Footer />
    </div>
  );
};

export default HomePage;
