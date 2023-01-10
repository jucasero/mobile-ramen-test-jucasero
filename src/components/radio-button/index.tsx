import { useRef } from 'react';
import './index.sass';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton: React.FC<IProps> = ({ label, value, ...rest }) => {
  const { checked } = rest;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`radio-button-container${
        checked ? ' radio-button-selected' : ''
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <label className='radio-button-label'>{label}</label>
      <input ref={inputRef} type='radio' value={value} {...rest} />
    </div>
  );
};

export default RadioButton;
