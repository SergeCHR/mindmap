import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import { auth, logInWithEmailAndPassword } from '../../firebase/auth'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonNavLink,
	IonPage,
	IonTitle,
	IonToast,
	IonToolbar,
} from '@ionic/react'

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [user, error, loading] = useAuthState(auth)
	const [toastMessage, setToastMessage] = useState<string>('')
	const [showToast, setShowToast] = useState<boolean>(false)
	const history = useHistory()
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (email.length && password.length) {
			await logInWithEmailAndPassword(email, password)
			if (!error) history.replace('/workouts')
		} else {
			setToastMessage('Please, fill out form')
			setShowToast(true)
		}
	}
	useEffect(() => {
		if (loading) {
			return
		}
		if (user) {
			history.push('/workouts')
			localStorage.setItem('user', user.uid)
		}
	}, [user, loading])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<form
					style={{ maxWidth: 576, margin: '32px auto' }}
					onSubmit={handleSubmit}
					className='ion-padding'>
					<IonItem>
						<IonLabel position='floating'>Email</IonLabel>
						<IonInput onIonChange={(e) => setEmail(e.detail.value!)} />
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Password</IonLabel>
						<IonInput
							onIonChange={(e) => setPassword(e.detail.value!)}
							type='password'
						/>
					</IonItem>
					<IonButton className='ion-margin-top' type='submit' expand='block'>
						Login
					</IonButton>
				</form>
				<IonItem>
					<IonButton
						onClick={() => history.push('/register')}
						size='default'
						type='button'
						fill='clear'
						color='primary'>
						New to us? Register
					</IonButton>
				</IonItem>
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
export default Login
