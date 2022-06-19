import {
	IonAccordion,
	IonAccordionGroup,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { arrowDownCircle, add, close, calendar } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import CreateModal from '../../components/CreateModal'
import DismissModal from '../../components/DismissModal'
import GetDate from '../../components/GetDate'
import { auth } from '../../firebase/auth'
export type SingleExercise = {
	date: Date
	amountOfReps: number
}
export type ExerciseData = {
	title: string
	exerciseList: SingleExercise[]
}
type WorkoutData = {
	title: string
	exercises: ExerciseData[]
}
const Mindmap: React.FC = () => {
	const [workoutsList, setWorkoutsList] = useState<WorkoutData[]>([])
	const accordionGroupRef = useRef<HTMLIonAccordionGroupElement>(null)
	const getCurrentAccordionItem = () => {
		if (accordionGroupRef.current) {
			return accordionGroupRef.current.value
		}
	}
	const [muscleGroupModalOpen, setMuscleGroupModalOpen] =
		useState<boolean>(false)
	const [deleteItem, setDeleteItem] = useState<string>('')
	const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false)
	const [isDismissExercise, setIsDismissExercise] = useState<boolean>(false)
	const [isDismissMuscle, setIsDismissMuscle] = useState<boolean>(false)
	const [user] = useAuthState(auth)
	useEffect(() => {
		const getUserWorkouts = async () => {
			const res = await fetch(`http://localhost:5000/users/${user?.uid}`)
			const data = await res.json()
			const modifiedData = Object.keys(data.workouts).map(
				(workout) => data.workouts[workout] as WorkoutData
			)
			setWorkoutsList(modifiedData)
		}
		getUserWorkouts()
	}, [])
	const handleMuscleGroup = (muscleGroup: string) => {
		const currWorkoutList = [
			...workoutsList,
			{ title: muscleGroup, exercises: [] },
		]
		setWorkoutsList(currWorkoutList)
	}
	const handleExercise = (exercise: string) => {
		const index = workoutsList.findIndex(
			(el) => el.title === getCurrentAccordionItem()
		)
		const currWorkouts = [...workoutsList]
		currWorkouts[index]?.exercises.push({ title: exercise, exerciseList: [] })
		setWorkoutsList(currWorkouts)
	}
	const deleteExercise = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/users/${localStorage.getItem(
					'user'
				)}/${getCurrentAccordionItem()}/${deleteItem}`,
				{
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			)
			if (res.status === 200) {
				const index = workoutsList!.findIndex(
					(el) => el.title === getCurrentAccordionItem()
				)
				const currWorkouts = [...workoutsList!]
				const exerciseIndex = currWorkouts[index].exercises.findIndex(
					(el) => el.title === deleteItem
				)
				currWorkouts[index].exercises.splice(exerciseIndex, 1)
				setWorkoutsList(currWorkouts)
			}
		} catch (err) {
			console.error(err)
		}
	}
	const deleteMuscleGroup = async () => {
		try {
			const res = await fetch(
				`http://localhost:5000/users/${localStorage.getItem(
					'user'
				)}/${deleteItem}`,
				{
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				}
			)
			if (res.status === 200) {
				const currWorkouts = workoutsList!.filter(
					(el) => el.title !== getCurrentAccordionItem()
				)
				setWorkoutsList(currWorkouts)
			}
		} catch (err) {
			console.error(err)
		}
	}
	const handleDeleteExercise = (exercise: string) => {
		setIsDismissExercise(true)
		setDeleteItem(exercise)
	}
	const handleDeleteMuscle = (muscle: string) => {
		setIsDismissMuscle(true)
		setDeleteItem(muscle)
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Your workouts</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Your workouts</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonAccordionGroup
					style={{ paddingBottom: 100 }}
					ref={accordionGroupRef}>
					{workoutsList?.map((workout) => (
						<IonAccordion
							toggleIcon={arrowDownCircle}
							key={workout.title}
							value={workout.title}>
							<IonItem slot='header'>
								<IonLabel
									style={{
										fontSize: 22,
										textTransform: 'uppercase',
										padding: '8px 0',
									}}>
									{workout.title}
								</IonLabel>
								<IonButton
									color='danger'
									onClick={(e) => handleDeleteMuscle(workout.title)}>
									<IonIcon icon={close}></IonIcon>
								</IonButton>
							</IonItem>

							<IonList slot='content'>
								{workout.exercises.map((exercise) => (
									<IonItem key={exercise.title}>
										<IonLabel
											style={{ fontSize: 22, textTransform: 'uppercase' }}>
											<Link
												className='Workouts_exerciseLink'
												to={`/workouts/${workout.title}/${exercise.title}`}>
												{exercise.title}
											</Link>
										</IonLabel>
										<IonButton
											onClick={() => handleDeleteExercise(exercise.title)}
											fill='outline'
											color={'danger'}>
											<IonIcon icon={close}></IonIcon>
										</IonButton>
									</IonItem>
								))}
								<IonItem key={'button'}>
									<IonButton
										onClick={() => setExerciseModalOpen(true)}
										fill='solid'
										color={'tertiary'}>
										<IonIcon icon={add}></IonIcon>
										New Exercise
									</IonButton>
								</IonItem>
							</IonList>
						</IonAccordion>
					))}
				</IonAccordionGroup>
				<IonButtons
					style={{
						position: 'fixed',
						bottom: 15,
						left: '50%',
						transform: 'translateX(-50%)',
					}}>
					<IonButton
						style={{
							width: 'min(80vw, 450px)',
						}}
						fill='solid'
						color={'tertiary'}
						onClick={() => setMuscleGroupModalOpen(true)}>
						<IonIcon icon={add}></IonIcon>
						New Workout
					</IonButton>
				</IonButtons>
			</IonContent>
			<CreateModal
				param='exercise'
				url={getCurrentAccordionItem()}
				title='Exercise Name'
				handleCreatedItems={handleExercise}
				modalOpen={exerciseModalOpen}
				setModalOpen={setExerciseModalOpen}
			/>
			<CreateModal
				param='muscleGroup'
				url=''
				title='Muscle Group Name'
				handleCreatedItems={handleMuscleGroup}
				modalOpen={muscleGroupModalOpen}
				setModalOpen={setMuscleGroupModalOpen}
			/>
			<DismissModal
				isOpen={isDismissExercise}
				setOpen={setIsDismissExercise}
				confirmFunc={deleteExercise}
			/>
			<DismissModal
				isOpen={isDismissMuscle}
				setOpen={setIsDismissMuscle}
				confirmFunc={deleteMuscleGroup}
			/>
		</IonPage>
	)
}

export default Mindmap
