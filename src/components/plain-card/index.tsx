import './index.sass';
interface IProps {
  className?: string;
}

const PlainCard: React.FC<IProps> = ({ className = '', children }) => (
  <div className={`card-container${className && className}`}>{children}</div>
);
export default PlainCard;
