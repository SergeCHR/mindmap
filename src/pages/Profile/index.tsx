import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'
import { Link } from 'react-router-dom'
import ProfileContainer from '../../components/ProfileContainer'
import { logout } from '../../firebase/auth'

import './Profile.css'

const Profile: React.FC = () => {
	const handleLogout = () => {
		logout()
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Profile</IonTitle>
					<IonButtons slot='end'>
						<IonButton onClick={handleLogout}>
							<Link to='/login' replace={true}>
								<IonIcon color='red' icon={logOutOutline} />
							</Link>
						</IonButton>
					</IonButtons>
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
