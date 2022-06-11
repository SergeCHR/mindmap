import { useState } from 'react'
import { auth, logout } from '../../firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { logOutOutline } from 'ionicons/icons'

import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonIcon,
	IonItem,
	IonLabel,
	IonToggle,
} from '@ionic/react'

import ProfileControls from '../ProfileControls'
import './ProfileContainer.css'
const ProfileContainer: React.FC = () => {
	const [user] = useAuthState(auth)
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const toggleModalOpen = () => {
		setModalOpen((prev) => !prev)
	}

	const toggleDarkModeHandler = () => {
		document.body.classList.toggle('dark')
	}
	const handleLogOut = () => {
		logout()
		localStorage.removeItem('user')
		window.history.pushState({ urlPath: '/login' }, '', '/login')
	}
	return (
		<div className='ProfileContainer'>
			<div
				className='ProfileContainer_image'
				style={{
					backgroundColor: (user?.photoURL as string) || 'red',
				}}>
				<h3>{user?.displayName?.charAt(0).toUpperCase()}</h3>
			</div>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>Name:</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>{user?.displayName}</IonCardContent>
			</IonCard>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>Email:</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>{user?.email}</IonCardContent>
			</IonCard>
			<IonCard style={{ border: '1px solid white' }}>
				<IonCardHeader>
					<IonCardSubtitle>Settings</IonCardSubtitle>
				</IonCardHeader>

				<IonItem>
					<IonLabel>Password:</IonLabel>
					<IonButton
						size='default'
						className='ion-margin-vertical'
						onClick={toggleModalOpen}
						slot='end'
						color={'tertiary'}>
						Change
					</IonButton>
				</IonItem>
				<IonItem>
					<IonLabel>Change theme</IonLabel>
					<IonToggle
						name='Change theme:'
						slot='end'
						color='tertiary'
						onClick={toggleDarkModeHandler}
					/>
				</IonItem>
				<ProfileControls
					modalOpen={modalOpen}
					toggleModalOpen={toggleModalOpen}
				/>
			</IonCard>
			<IonButton
				style={{
					position: 'relative',
					minWidth: '144px',
					left: '50%',
					transform: 'translateX(-50%)',
				}}
				onClick={handleLogOut}
				color='danger'
				fill='outline'>
				<IonIcon icon={logOutOutline} /> Log out
			</IonButton>
		</div>
	)
}

export default ProfileContainer
