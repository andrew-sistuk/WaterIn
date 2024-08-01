// import { useState } from 'react';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { toast } from 'react-toastify';
import css from './NotFound.module.css';

export default function NotFound() {
  //   const [count, setCount] = useState(0);
  function handleClick(messege = '🦄 Wow so easy!') {
    toast(messege);
  }
  return (
    <div>
      <img className={css.image} src="/404.png" alt="Page not found" />
      <button onClick={() => handleClick()}>Click me!</button>
      <Loader />
      <Message />
    </div>
  );
}
