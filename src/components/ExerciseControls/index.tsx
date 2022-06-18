import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardHeader,
	IonIcon,
	IonCardTitle,
} from '@ionic/react'
import { add } from 'ionicons/icons'
type ExerciseControlsProps = {
	exerciseName: string
	handleButton: () => void
}
const ExerciseControls: React.FC<ExerciseControlsProps> = ({
	exerciseName,
	handleButton,
}) => {
	return (
		<IonCard>
			<IonCardHeader
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<IonCardTitle style={{ fontSize: 18 }} color={'tertiary'}>
					Your {exerciseName} exercises
				</IonCardTitle>
				<IonButtons>
					<IonButton onClick={handleButton} fill='solid' color={'tertiary'}>
						<IonIcon icon={add}></IonIcon>
					</IonButton>
				</IonButtons>
			</IonCardHeader>
		</IonCard>
	)
}

export default ExerciseControls
