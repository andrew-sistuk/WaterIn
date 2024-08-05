import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import SignUpForm from '../../components/SignForms/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

export default function SignUpPage() {
  return (
    <section className="container">
      <WelcomeContainer>
        <SignUpForm />
        <AdvantagesSection />
      </WelcomeContainer>
    </section>
  );
}
