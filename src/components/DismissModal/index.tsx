import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import {
	IonModal,
	IonContent,
	IonButtons,
	IonButton,
	IonHeader,
	IonTitle,
} from '@ionic/react'

type DismissModalProps = {
	isOpen: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	confirmFunc: () => void
}

const DismissModal: React.FC<DismissModalProps> = ({
	isOpen,
	setOpen,
	confirmFunc,
}) => {
	return (
		<IonModal
			isOpen={isOpen}
			initialBreakpoint={0.15}
			onDidDismiss={() => setOpen(false)}>
			<IonContent style={{ paddingTop: '25px' }}>
				<IonHeader>
					<IonTitle style={{ margin: '25px auto' }}>Are you sure?</IonTitle>
				</IonHeader>
				<IonButtons
					style={{
						marginTop: 50,
						display: 'flex',
						justifyContent: 'center',
						gap: 30,
					}}>
					<IonButton
						fill='outline'
						color='success'
						onClick={() => {
							confirmFunc()
							setOpen(false)
						}}>
						Confirm
					</IonButton>
					<IonButton
						fill='outline'
						color='danger'
						onClick={() => setOpen(false)}>
						Cancel
					</IonButton>
				</IonButtons>
			</IonContent>
		</IonModal>
	)
}

export default DismissModal
