import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import Chart from '../../components/Chart'
import './Workouts.css'

const Mindmap: React.FC = () => {
	const data: any[] = [
		{
			date: new Date(2022, 0, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 1, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 2, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 3, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 4, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 5, 2),
			estimatedMax: Math.random() * 100,
		},
		{
			date: new Date(2022, 6, 2),
			estimatedMax: Math.random() * 100,
		},
	]
	// const data: any = []
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Your workouts</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Your workouts</IonTitle>
					</IonToolbar>
				</IonHeader>
				<Chart entries={data} />
			</IonContent>
		</IonPage>
	)
}

export default Mindmap
