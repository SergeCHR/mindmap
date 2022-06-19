import React, { useState } from 'react'
import {
	IonButton,
	IonContent,
	IonDatetime,
	IonIcon,
	IonModal,
} from '@ionic/react'
import { calendar } from 'ionicons/icons'
import { format, parseISO } from 'date-fns'

type DateTimeProps = {
	url: string
	handleEdit: (date: Date, newDate: Date) => void
	dateVal: Date
}

const DateTime: React.FC<DateTimeProps> = ({ url, handleEdit, dateVal }) => {
	const [selectedDate, setSelectedDate] = useState(
		format(Date.now(), `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`)
	)
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const formatDate = (value: string) => {
		return format(parseISO(value), 'MMM dd yyyy')
	}
	const handleEditDate = async (e: any) => {
		try {
			console.log(dateVal)
			const res = await fetch(
				`http://localhost:5000/users/${localStorage.getItem('user')}/${url}`,
				{
					method: 'PUT',
					body: JSON.stringify({
						date: dateVal,
						newDate: e.detail.value!,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			)
			if (res.status === 200) {
				handleEdit(dateVal, new Date(e.detail.value!))
			}
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<>
			<IonButton
				size='small'
				color={'tertiary'}
				onClick={() => setModalOpen(true)}
				style={{
					position: 'absolute',
					right: 60,
					top: 5,
				}}>
				<IonIcon icon={calendar}></IonIcon>
			</IonButton>
			<IonModal
				onDidDismiss={() => setModalOpen(false)}
				showBackdrop={true}
				isOpen={modalOpen}>
				<IonContent forceOverscroll={false}>
					<IonDatetime
						style={{
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-50%)',
						}}
						showDefaultButtons={true}
						size='cover'
						color='tertiary'
						presentation='date-time'
						value={selectedDate}
						onIonChange={handleEditDate}></IonDatetime>
				</IonContent>
			</IonModal>
		</>
	)
	{
		/* Full width size */
	}
	{
		/* <IonDatetime size="cover"></IonDatetime> */
	}

	{
		/* Custom Hour Cycle */
	}
	{
		/* <IonDatetime hourCycle="h23"></IonDatetime> */
	}

	{
		/* Custom first day of week */
	}
	{
		/* <IonDatetime firstDayOfWeek={1}></IonDatetime> */
	}

	{
		/* Custom title */
	}
	{
		/* <IonDatetime>
        <div slot="title">My Custom Title</div>
      </IonDatetime> */
	}

	{
		/* Clear button */
	}
	{
		/* <IonDatetime showClearButton={true}></IonDatetime> */
	}

	{
		/* Custom buttons */
	}
	{
		/* <IonDatetime ref={customDatetime}>
        <IonButtons slot="buttons">
          <IonButton onClick={() => confirm()}>Good to go!</IonButton>
          <IonButton onClick={() => reset()}>Reset</IonButton>
        </IonButtons>
      </IonDatetime> */
	}

	{
		/* Disable custom days */
	}
	{
		/* <IonDatetime isDateEnabled={(dateIsoString: string) => {
        const date = new Date(dateIsoString);
        if (getDate(date) === 1 && getMonth(date) === 0 && getYear(date) === 2022) {
          // Disables January 1, 2022.
          return false;
        }
        return true;
      }}></IonDatetime> */
	}

	{
		/* Datetime in overlay */
	}
	{
		/* <IonButton id="open-modal">Open Datetime Modal</IonButton>
      <IonModal trigger="open-modal">
        <IonContent>
          <IonDatetime></IonDatetime>
        </IonContent>
      </IonModal> */
	}
}

export default DateTime
