import WelcomeContainer from '../../components/WelcomeContainer/WelcomeContainer';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';

/////////////////////Delete then//////////////////////////
import { login } from '../../redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('запит на логін');
    const userDate = {
      email: 'deidar@gmail.com',
      password: 'DEIDARRR',
    };
    dispatch(login(userDate));
  };
  const logIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (logIn) {
      navigate('/tracker');
    }
  }, [logIn, navigate]);
  ///////////////////////////////////////////////////////

  return (
    <section className="container">
      <button onClick={handleLogin}>login</button>

      <WelcomeContainer>
        <WelcomeSection />
        <AdvantagesSection />
      </WelcomeContainer>
    </section>
  );
}
