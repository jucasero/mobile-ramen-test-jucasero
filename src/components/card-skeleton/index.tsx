import { IonSkeletonText } from "@ionic/react";
import "./index.sass";

interface IProps {
  numberOfcards: number;
}

const CardSkeleton: React.FC<IProps> = ({ numberOfcards }) => (
  <>
    {Array.from({ length: numberOfcards }).map((_, index) => (
      <IonSkeletonText key={index} className="task-card" animated />
    ))}
  </>
);

export default CardSkeleton;
