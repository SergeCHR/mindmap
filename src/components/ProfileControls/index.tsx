import {
	IonButton,
	IonButtons,
	IonContent,
	IonInput,
	IonItem,
	IonLabel,
	IonModal,
	IonToast,
} from '@ionic/react'
import { useState } from 'react'
import { changePassword } from '../../firebase/auth'

type ProfileControlsProps = {
	modalOpen: boolean
	toggleModalOpen: () => void
}

const ProfileControls: React.FC<ProfileControlsProps> = ({
	modalOpen,
	toggleModalOpen,
}) => {
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [toss, setToss] = useState<boolean>(false)
	const [tossMessage, setTossMessage] = useState<string>('')
	const handleSubmit = (e: any) => {
		e.preventDefault()
		switch (true) {
			case confirmPassword !== password:
				setToss(true)
				setTossMessage('Passwords do not match, try again')
				break
			case confirmPassword.trim().length < 6:
				setToss(true)
				setTossMessage('Password is too short!')
				break
			default:
				changePassword(password)
				toggleModalOpen()
				break
		}
	}
	return (
		<IonModal isOpen={modalOpen}>
			<IonContent>
				<form
					style={{
						position: 'absolute',
						bottom: 200,
						left: '50%',
						transform: 'translateX(-50%)',
						width: '80%',
						maxWidth: 375,
					}}
					autoComplete='do-not-autofill'
					onSubmit={handleSubmit}
					className='ion-padding'>
					<IonItem>
						<IonLabel position='floating'>Password</IonLabel>
						<IonInput
							autocomplete='new-password'
							onIonChange={(e) => setPassword(e.detail.value!)}
							type='password'
						/>
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Confirm password</IonLabel>
						<IonInput
							autocomplete='new-password'
							onIonChange={(e) => setConfirmPassword(e.detail.value!)}
							type='password'
						/>
					</IonItem>
					<IonButtons
						style={{
							display: 'grid',
						}}
						slot='end'>
						<IonButton
							style={{
								margin: '10px 0',
							}}
							fill='outline'
							color={'tertiary'}
							type='submit'>
							OK
						</IonButton>
						<IonButton
							className='ion-margin-vertical'
							fill='outline'
							color={'danger'}
							type='button'
							onClick={toggleModalOpen}
							slot='end'>
							Cancel
						</IonButton>
					</IonButtons>
				</form>
			</IonContent>
			<IonToast
				isOpen={toss}
				onDidDismiss={() => setToss(false)}
				message={tossMessage}
				duration={350}
			/>
		</IonModal>
	)
}
export default ProfileControls
