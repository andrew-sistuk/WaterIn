import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import SignInForm from '../../components/SignForms/SignInForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

export default function SignInPage() {
  return (
    <section className="container">
      <WelcomeContainer>
        <SignInForm />
        <AdvantagesSection />
      </WelcomeContainer>
    </section>
  );
}
