// import { useState } from 'react';
import Message from '../Message/Message';
import { toast } from 'react-toastify';

export default function NotFound() {
  //   const [count, setCount] = useState(0);
  function handleClick(messege = '🦄 Wow so easy!') {
    toast(messege);
  }
  return (
    <div>
      <p>404 Page not found...</p>
      <button onClick={() => handleClick()}>Click me!</button>
      <Message />
    </div>
  );
}
