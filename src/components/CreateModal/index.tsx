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
import { SetStateAction, useState } from 'react'

type CreateModalProps = {
	modalOpen: boolean
	setModalOpen: React.Dispatch<SetStateAction<boolean>>
	handleCreatedItems: (value: string) => void
	title: string
	url: string | undefined | null | string[]
	param: string
}

const CreateModal: React.FC<CreateModalProps> = ({
	modalOpen,
	setModalOpen,
	handleCreatedItems,
	title,
	url,
	param,
}) => {
	const [input, setInput] = useState<string>('')
	const [toss, setToss] = useState<boolean>(false)
	const [tossMessage, setTossMessage] = useState<string>('')
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (!input.length) {
			setToss(true)
			setTossMessage('Please, enter valid value')
			return
		}
		try {
			const res = await fetch(
				`https://evening-earth-40603.herokuapp.com/users/${localStorage.getItem(
					'user'
				)}/${url}`,
				{
					method: 'POST',
					body: JSON.stringify({
						[param]: input,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			)
			setModalOpen(false)
			handleCreatedItems(input)
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<IonModal
			initialBreakpoint={0.35}
			onDidDismiss={() => setModalOpen(false)}
			isOpen={modalOpen}>
			<IonContent>
				<form
					// style={{
					// 	position: 'absolute',
					// 	bottom: 200,
					// 	left: '50%',
					// 	transform: 'translateX(-50%)',
					// 	width: '80%',
					// 	maxWidth: 375,
					// }}
					autoComplete='do-not-autofill'
					onSubmit={handleSubmit}
					className='ion-padding'>
					<IonItem>
						<IonLabel position='floating'>{title}</IonLabel>
						<IonInput
							onIonChange={(e) => setInput(e.detail.value!)}
							type='text'
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
							onClick={() => setModalOpen(false)}
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
export default CreateModal
