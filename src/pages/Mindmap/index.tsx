import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import ExploreContainer from '../../components/ExploreContainer'
import './Tab2.css'

const Mindmap: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Mindmap</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Mindmap</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name='Tab 2 page' />
			</IonContent>
		</IonPage>
	)
}

export default Mindmap
