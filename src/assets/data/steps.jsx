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
