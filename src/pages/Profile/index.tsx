import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'

import ProfileContainer from '../../components/ProfileContainer'

import './Profile.css'

const Profile: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Profile</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Profile</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ProfileContainer />
			</IonContent>
		</IonPage>
	)
}

export default Profile
