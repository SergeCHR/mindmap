import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export type Article = {
	title: string
	short_description: string
	description: string
	mainImage: string
	muscleGroup: string
	slug: string
}

const Articles: React.FC = () => {
	const [articles, setArticles] = useState<Article[]>([])
	useEffect(() => {
		const getArticlesData = async () => {
			const res = await fetch('https://evening-earth-40603.herokuapp.com/info')
			const data = await res.json()
			setArticles(data as Article[])
		}
		getArticlesData()
	}, [])
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Explore fitness</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Explore fitness</IonTitle>
					</IonToolbar>
				</IonHeader>
				{articles.map((article) => (
					<Link key={article.title} to={`/articles/${article.slug}`}>
						<IonCard>
							<img src={article.mainImage} />
							<IonCardHeader>
								<IonCardSubtitle>{article.muscleGroup}</IonCardSubtitle>
								<IonCardTitle>{article.title}</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>{article.short_description}</IonCardContent>
						</IonCard>
					</Link>
				))}
			</IonContent>
		</IonPage>
	)
}

export default Articles
