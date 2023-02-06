import './index.sass';

import { ReactComponent as ChevronIcon } from '../../../../../assets/media/chevron.svg';

interface IProps {
  isShowing: boolean;
  toggle: () => any;
}
const DropDown = ({ isShowing, toggle }: IProps) => (
  <div className='dropdown'>
    <div className='dropdown--line' />
    <div
      className={isShowing ? 'dropdown--arrow-active' : 'dropdown--arrow'}
      onClick={toggle}
    >
      <ChevronIcon stroke={isShowing ? '#FFFFFF' : '#333333'} />
    </div>
    <div className='dropdown--line' />
  </div>
);

export default DropDown;
