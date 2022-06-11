import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, registerWithEmailAndPassword } from '../../firebase/auth'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonTitle,
	IonToast,
	IonToolbar,
} from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import { useHistory } from 'react-router'
interface InputChangeEventDetail {
	value: string | undefined | null
}

const Register: React.FC = () => {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [user, loading] = useAuthState(auth)
	const [toastMessage, setToastMessage] = useState<string>('')
	const [showToast, setShowToast] = useState<boolean>(false)
	const history = useHistory()
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (username.length && email.length && password.length > 5) {
			registerWithEmailAndPassword(username, email, password)
		} else {
			setToastMessage('Please, fill out form')
			setShowToast(true)
		}
	}
	useEffect(() => {
		if (loading) return
		if (user)
			window.history.pushState({ urlPath: '/workouts' }, '', '/workouts')
	}, [user, loading])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Register</IonTitle>
					<IonButtons>
						<IonButton onClick={history.goBack}>
							<IonIcon icon={chevronBack}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form
					style={{ maxWidth: 576, margin: '32px auto' }}
					onSubmit={handleSubmit}
					className='ion-padding'>
					<IonItem>
						<IonLabel position='floating'>Email</IonLabel>
						<IonInput
							type='email'
							onIonChange={(e) => setEmail(e.detail.value!)}
						/>
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Username</IonLabel>
						<IonInput onIonChange={(e) => setUsername(e.detail.value!)} />
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Password</IonLabel>
						<IonInput
							onIonChange={(e) => setPassword(e.detail.value!)}
							type='password'
						/>
					</IonItem>
					<IonButton className='ion-margin-top' type='submit' expand='block'>
						Register
					</IonButton>
				</form>
			</IonContent>
			<IonToast
				isOpen={showToast}
				onDidDismiss={() => setShowToast(false)}
				message={toastMessage}
				duration={350}
			/>
		</IonPage>
	)
}
export default Register
