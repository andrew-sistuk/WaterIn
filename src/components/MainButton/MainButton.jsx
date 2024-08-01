export default function MainButton({ text = 'Save', onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
