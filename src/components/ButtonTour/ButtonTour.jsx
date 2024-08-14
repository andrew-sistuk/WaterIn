import { useTour } from '@reactour/tour';
import css from './ButtonTour.module.css';
import { useEffect } from 'react';
import { AiTwotoneBulb } from 'react-icons/ai';

const TourButton = () => {
  const { setIsOpen, isOpen } = useTour();
  const tourAlreadyStarted = localStorage.getItem('tourStarted');
  const body = document.getElementsByTagName('body')[0];

  const handleOpenTour = () => {
    if (body) {
      setIsOpen(true);
      localStorage.setItem('tourStarted', 'true');
      body.classList.add('overflowHidden');
    }
  };

  useEffect(() => {
    if (!tourAlreadyStarted && body) {
      setIsOpen(true);
      localStorage.setItem('tourStarted', 'true');
      body.classList.add('overflowHidden');
    }

    return () => {
      if (isOpen) {
        body.classList.remove('overflowHidden');
      }
    };
  }, [body, setIsOpen, tourAlreadyStarted, isOpen]);

  return (
    <button className={css.buttonTour} onClick={handleOpenTour}>
      <AiTwotoneBulb size={32} />
    </button>
  );
};

export default TourButton;
