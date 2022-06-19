import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonItemDivider,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { format } from 'date-fns'
import { chevronBack, close } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router'
import Chart from '../../components/Chart'
import './Workouts.css'
import { SingleExercise } from '.'
import ExerciseControls from '../../components/ExerciseControls'
import CreateModal from '../../components/CreateModal'
import DismissModal from '../../components/DismissModal'
import GetDate from '../../components/GetDate'

const Exercise: React.FC = () => {
	const [chartEntries, setChartEntries] = useState<SingleExercise[]>([])
	const [exerciseList, setExerciesList] = useState<SingleExercise[]>([])
	const [isDismissModal, setIsDismissModal] = useState<boolean>(false)
	const [deleteItem, setDeleteItem] = useState<Date>()
	const history = useHistory()
	const location = useLocation()
	const match = useRouteMatch<{ workoutId: string; exerciseId: string }>(
		'/workouts/:workoutId/:exerciseId'
	)
	const deleteActivity = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/users/${localStorage.getItem('user')}/${
					match?.params.workoutId
				}/${match?.params.exerciseId}/activity`,
				{
					method: 'DELETE',
					body: JSON.stringify({
						date: deleteItem,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			)
			if (res.status === 200) {
				const currActivities = exerciseList!.filter(
					(el) => el.date !== deleteItem
				)
				setExerciesList(currActivities)
			}
		} catch (err) {
			console.error(err)
		}
	}
	const handleDeleteActivity = (date: Date) => {
		setDeleteItem(date)
		setIsDismissModal(true)
	}
	const handleCreateActivity = (amount: string) => {
		const currWorkoutList = [
			...exerciseList,
			{ amountOfReps: parseInt(amount), date: new Date(Date.now()) },
		]

		setExerciesList(currWorkoutList)
	}

	function groupData(data: any) {
		const map = new Map()
		for (const { date, amountOfReps } of data) {
			const currDate = new Date(date).toDateString().slice(0, 10)
			const mapData = map.get(currDate)
			if (mapData) {
				let amount = Math.floor((mapData.amountOfReps + amountOfReps) / 2)
				mapData.amountOfReps = amount
			} else {
				map.set(currDate, {
					date: new Date(currDate),
					amountOfReps: amountOfReps,
				})
			}
		}
		return Array.from(map.values())
	}
	const handleEditActivity = (date: Date, newDate: Date) => {
		const index = exerciseList.findIndex((el) => el.date === date)
		let currExercises = [...exerciseList]
		currExercises[index].date = newDate
		currExercises = currExercises.sort((a: any, b: any) =>
			a.date > b.date ? 1 : -1
		)
		setExerciesList(currExercises)
		setChartEntries(groupData(currExercises))
	}
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	useEffect(() => {
		const getWorkoutExercise = async () => {
			try {
				const res = await fetch(
					`http://localhost:5000/users/${localStorage.getItem('user')}/${
						match?.params.workoutId
					}/${match?.params.exerciseId}`
				)
				const data = await res.json()
				const modifiedActivities = data.activities
					.map((el: SingleExercise) => ({
						amountOfReps: el.amountOfReps,
						date: new Date(el.date),
					}))
					.sort((a: any, b: any) => (a.date > b.date ? 1 : -1))
				const chartData = groupData(modifiedActivities)
				setChartEntries(chartData)
				setExerciesList(modifiedActivities || [])
			} catch (err: any) {
				console.error(err.message)
			}
		}
		getWorkoutExercise()
	}, [location.pathname, exerciseList.length])
	if (!match?.params) return null
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						Workout | {match?.params.exerciseId.toUpperCase()}
					</IonTitle>
					<IonButtons slot='start'>
						<IonButton onClick={() => history.push('/workouts')}>
							<IonIcon icon={chevronBack}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Chart entries={chartEntries} />
				<ExerciseControls
					handleButton={() => setModalOpen(true)}
					exerciseName={match!.params.exerciseId}
				/>
				<IonCard>
					{exerciseList.map((exercise, idx) => (
						<>
							<IonCardContent
								style={{
									paddingBottom: 20,
								}}
								key={new Date(exercise.date).toDateString()}>
								<p style={{ fontSize: 18 }}>{exercise.amountOfReps} reps</p>
								<GetDate
									url={`${match.params.workoutId}/${match.params.exerciseId}/activity`}
									dateVal={exercise.date}
									handleEdit={handleEditActivity}
								/>
								<IonButton
									style={{
										position: 'absolute',
										right: 16,
										top: 5,
										'--padding-start': '4px',
										'--padding-end': '4px',
									}}
									shape='round'
									size='small'
									onClick={() => handleDeleteActivity(exercise.date)}
									fill='outline'
									color={'danger'}>
									<IonIcon icon={close}></IonIcon>
								</IonButton>
								<div
									style={{
										position: 'absolute',
										bottom: 5,
										right: 16,
										color: '#a3a3a3',
										fontSize: 12,
									}}>
									{format(new Date(exercise.date), `MM.dd - HH:mm`)}
								</div>
							</IonCardContent>
							{idx !== exerciseList.length - 1 ? (
								<IonItemDivider
									style={{
										'--padding-start': 0,
										'--inner-padding-end': 0,
										minHeight: 4,
										opacity: 0.3,
									}}
									color={'tertiary'}
								/>
							) : null}
						</>
					))}
				</IonCard>
			</IonContent>
			<CreateModal
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				title='Enter amount of reps'
				handleCreatedItems={handleCreateActivity}
				url={`${match?.params.workoutId}/${match?.params.exerciseId}`}
				param='amountOfReps'
			/>
			<DismissModal
				isOpen={isDismissModal}
				setOpen={setIsDismissModal}
				confirmFunc={deleteActivity}
			/>
		</IonPage>
	)
}

export default Exercise
