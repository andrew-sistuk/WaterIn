import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import SignInForm from '../../components/SignForms/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import useWindowWidth from '../../utils/hooks/useWindowWidth';
import Message from '../../components/Message/Message';

export default function SignInPage() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth >= 1440;

  return (
    <section className="container">
      <WelcomeContainer isMobile={!isMobile}>
        <SignInForm isMobile={!isMobile} />
        {isMobile && <AdvantagesSection />}
      </WelcomeContainer>
      <Message />
    </section>
  );
}
