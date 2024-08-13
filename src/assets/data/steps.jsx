import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

export const steps = [
  {
    selector: "[data-tour='intro-text']",
    content: <p>This is your personal water tracker.</p>,
  },
  {
    selector: "[data-tour='daily-allowance']",
    content: <p>Here you can see your daily water allowance.</p>,
  },
  {
    selector: "[data-tour='progress-goal']",
    content: <p>You can see how close you are to your goal of drinking water for the day.</p>,
  },
  {
    selector: "[data-tour='daily-intake']",
    content: (
      <p>
        This field will display the amount of water and you can add, edit or delete an entry for
        water consumption.
      </p>
    ),
  },
  {
    selector: "[data-tour='settings-panel']",
    content: (
      <p>
        This is the panel for your personal settings, including personal information and water
        tracking preferences.
      </p>
    ),
  },
  {
    selector: "[data-tour='calendar']",
    content: <p>This calendar will display how many percent of water was drunk each day.</p>,
  },
  {
    selector: "[data-tour='toggle-view-button']",
    content: <p>Use this button to switch between the calendar and schedule views.</p>,
  },
];

export const tourStyles = {
  // Стилі для головного контейнера туру
  badge: base => ({
    ...base,
    backgroundColor: '#9be1a0', // Колір значка
    color: '#FFFFFF', // Колір тексту в значку
  }),
  controls: base => ({
    ...base,
    color: '#9be1a0', // Колір тексту кнопок "Next" і "Back"
  }),
  close: base => ({
    ...base,
    color: '#9be1a0', // Колір кнопки закриття
  }),
  arrow: base => ({
    ...base,
    color: '#9be1a0', // Колір стрілки
  }),
  dot: (base, state) => ({
    ...base,
    backgroundColor: state.current ? '#9be1a0' : '#CCCCCC', // Колір активної точки та інших точок навігації
  }),
};

export const customComponents = {
  // Задаємо іконку для кнопки закриття
  Close: ({ onClick }) => <FaTimes onClick={onClick} />,
  // Задаємо іконку для кнопки "Next"
  Arrow: ({ onClick, inverted }) =>
    inverted ? <FaArrowLeft onClick={onClick} /> : <FaArrowRight onClick={onClick} />,
};
