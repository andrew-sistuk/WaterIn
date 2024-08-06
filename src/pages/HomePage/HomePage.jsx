import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import Message from '../../components/Message/Message';

export default function HomePage() {
  return (
    <section className="container">
      <WelcomeContainer>
        <WelcomeSection />
        <AdvantagesSection />
      </WelcomeContainer>
      <Message />
    </section>
  );
}
