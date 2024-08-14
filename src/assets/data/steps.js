import { useTranslation } from 'react-i18next';

const TourSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      selector: "[data-tour='intro-text']",
      content: t('onboarding.1'),
    },
    {
      selector: "[data-tour='daily-allowance']",
      content: t('onboarding.2'),
    },
    {
      selector: "[data-tour='progress-goal']",
      content: t('onboarding.3'),
    },

    {
      selector: "[data-tour='daily-intake']",
      content: t('onboarding.4'),
    },

    {
      selector: "[data-tour='settings-panel']",
      content: t('onboarding.5'),
    },

    {
      selector: "[data-tour='calendar']",
      content: t('onboarding.6'),
    },

    {
      selector: "[data-tour='toggle-view-button']",
      content: t('onboarding.7'),
    },
  ];

  return steps;
};

export default TourSteps;
