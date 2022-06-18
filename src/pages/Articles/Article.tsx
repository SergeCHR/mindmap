import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import './Article.css'

import { Article } from '.'
import { useHistory, useLocation, useRouteMatch } from 'react-router'
import { chevronBack } from 'ionicons/icons'

const ArticlePage: React.FC = () => {
	const [article, setArticle] = useState<Article>()
	const match = useRouteMatch<{ slug: string }>('/articles/:slug/')
	const location = useLocation()
	const history = useHistory()
	useEffect(() => {
		const getArticlesData = async () => {
			const res = await fetch(
				`http://localhost:5000/info/${match?.params.slug}`
			)
			const data = await res.json()
			setArticle(data as Article)
		}
		getArticlesData()
	}, [location])
	if (!match?.params) return null
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>{article?.title.toUpperCase()}</IonTitle>
					<IonButtons slot='start'>
						<IonButton onClick={() => history.push('/articles')}>
							<IonIcon icon={chevronBack}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>{article?.title.toUpperCase()}</IonTitle>
					</IonToolbar>
				</IonHeader>
				{article && (
					<IonCard>
						<img src={article.mainImage} />
						<IonCardHeader>
							<IonCardSubtitle>{article.muscleGroup}</IonCardSubtitle>
						</IonCardHeader>
						<IonCardContent
							className='Article'
							dangerouslySetInnerHTML={{ __html: article.description }}
						/>
					</IonCard>
				)}
			</IonContent>
		</IonPage>
	)
}

export default ArticlePage
