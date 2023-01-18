import { IonButton, IonSpinner } from '@ionic/react';

import './index.sass';

interface IProps {
  text: string;
  type?: string;
  color: string;
  onClick?: () => any; // TODO: remove ? in the future
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<IProps> = ({
  text,
  type,
  color,
  onClick,
  disabled,
  loading,
}) => {
  const styles = () => {
    switch (type) {
      case 'primary':
        return 'button--dark';
      case 'secondary':
        return 'button--light';

      default:
        return 'button--dark';
    }
  };

  return (
    <div>
      <IonButton
        color={color}
        shape='round'
        className={styles()}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <IonSpinner name='crescent' color='light' /> : text}
      </IonButton>
    </div>
  );
};

export default Button;
