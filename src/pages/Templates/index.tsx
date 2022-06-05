import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './Templates.css'

const Templates: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>My templates</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>My templates</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name='Tab 1 page' />
			</IonContent>
		</IonPage>
	)
}

export default Templates
