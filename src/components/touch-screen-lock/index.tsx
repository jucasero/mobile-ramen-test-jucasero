import { createPortal } from 'react-dom';
import './index.sass';

interface IProps {
  activate: boolean;
}

const TouchScreenLock: React.FC<IProps> = ({ activate }) => {
  const rootElement = document.getElementById('root') as HTMLElement;
  if (activate) return createPortal(<div className='overlay' />, rootElement);
  else return null;
};

export default TouchScreenLock;
