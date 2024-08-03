import css from './SignIn.module.css';

export default function SignIn() {
  return (
    <form className={css['sign-in-form']}>
      <h1>Sign In</h1>
      <label className={css.label}>
        Email:
        <input type="email" />
      </label>
      <label className={css.label}>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Sign In</button>
      <p>
        Don’t have an account? <span>Sign Up</span>
      </p>
    </form>
  );
}
