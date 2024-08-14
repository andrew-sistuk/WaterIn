import { TourProvider } from '@reactour/tour';
import TourSteps from '../../assets/data/steps.js';

export const TourProviderWrapper = ({ children }) => {
  const steps = TourSteps();

  return (
    <TourProvider
      steps={steps}
      disableInteraction
      styles={{
        popover: base => ({
          ...base,
          borderRadius: 20,
        }),
        maskArea: base => ({ ...base, rx: 30 }),
        badge: base => ({
          ...base,
          backgroundColor: '#9be1a0',
          color: '#FFFFFF',
        }),
        controls: base => ({
          ...base,
          color: '#9be1a0',
        }),
        close: base => ({
          ...base,
          right: 12,
          top: 12,
          color: '#9be1a0',
        }),
        arrow: base => ({
          ...base,
          color: '#9be1a0',
        }),
        dot: (base, state) => ({
          ...base,
          backgroundColor: state.current ? '#9be1a0' : '#CCCCCC',
        }),
      }}
      padding={{
        mask: 25,
        popover: [0, 5],
      }}
    >
      {children}
    </TourProvider>
  );
};
