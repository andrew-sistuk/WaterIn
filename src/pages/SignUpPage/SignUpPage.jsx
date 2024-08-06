import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import SignUpForm from '../../components/SignForms/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import useWindowWidth from '../../utils/hooks/useWindowWidth';

export default function SignUpPage() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth > 1440;

  return (
    <section className="container">
      <WelcomeContainer isMobile={!isMobile}>
        <SignUpForm isMobile={!isMobile} />
        {isMobile && <AdvantagesSection />}
      </WelcomeContainer>
    </section>
  );
}
