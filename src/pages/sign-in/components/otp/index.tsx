import { IonHeader, IonIcon, IonPage } from "@ionic/react";
import { arrowBack } from 'ionicons/icons'

const OtpSignIn: React.FC = () => {
  return (
    <IonPage>
			<IonHeader>
				<div onClick={() => {console.log('close')}}>
          <IonIcon icon={arrowBack}></IonIcon>
        </div>
			</IonHeader>
		</IonPage>
  )
}

export default OtpSignIn;