import { useEffect, useState } from 'react'
import { HamsterObject, MatchObject } from '../types/Types'


const GalleryHamster = (props : any ) => {

	const [ removed, setRemoved ] = useState(false)
	const [ loserHamsters, setLoserHamsters ] = useState< null | HamsterObject[]  >(null)

	useEffect (() => {

		const getMatchWinner = async () => {

			try {
				
				//Get alla matches som den hamstern har vunnit
				const matchWinnerResponse = await fetch(`/matchWinners/${props.selectedHamster.id}`, { method: 'GET'})
				const matchWinnerData: MatchObject[]  = await matchWinnerResponse.json()

				//Hämta loserId från matchObjekt
				const loserIds = matchWinnerData?.map(loser => loser.loserId)

				//Ta bort duplicerad loserId
				const cleanedLoserId = Array.from(new Set(loserIds))

				//Hämta HamsterObjekt med använd av loserId
				const hamsterRes = await Promise.all(cleanedLoserId.map(async id => fetch(`/hamsters/${id}`, { method: 'GET'}))) 
				const hamsterData = await Promise.all(hamsterRes.map(r => r.json()))
				setLoserHamsters(hamsterData)
				
				// setLoserId(cleanedLoserId)
				
			} catch (error) {
				console.log(error);
				
			}
		}
		getMatchWinner()
	},[props.selectedHamster.id])


	const removeHamster = async () => {
		const removeHamsterRequest = {
			method: 'DELETE'
		}
		const removeHamsterResponse = await fetch(`/hamsters/${props.selectedHamster.id}`, removeHamsterRequest)
		const removeHamsterData = await removeHamsterResponse.text()
		console.log(removeHamsterData);
		if(removeHamsterData === 'OK') {
			setRemoved(true)
			
		}
	}

	return (
		<div className="galleryHamster">
			<section >
				{!removed 
					? <>
					<div className="galleryHamster-wrapper">
						<section className="galleryHamster-img">
							<img src={`img/${props.selectedHamster.imgName}`} alt={props.selectedHamster.imgName}/>
						</section>
						<section className="galleryHamster-info">
							<h2>{props.selectedHamster.name}</h2>
							<p>Age: {props.selectedHamster.age}</p>
							<p>Loves: {props.selectedHamster.loves}</p>
							<p>Favorite Food: {props.selectedHamster.favFood}</p>
							<p>Wins: {props.selectedHamster.wins}</p>
							<p>Defeats: {props.selectedHamster.defeats}</p>
							<p>Total matches: {props.selectedHamster.games}</p>
							<p>{props.selectedHamster.name} has defeated:</p>
						<ul>
							{loserHamsters
							? 
							loserHamsters.map(hamster => (
								<li key={hamster.name}>
									<p>{hamster.name}</p>
								</li>))
							:
							<p>no one</p>}
						</ul>
						<button onClick={removeHamster}>Remove this hamster</button>
						</section>
					</div>
					</>
					: <section className="removed">
						<p>removed!</p>
					  </section>
				}
			</section>
			<button 
			className="galleryHamster-button" 
			onClick={() => {props.setHideHamsters(false); 
			props.setShowHamsterInfo(false); 
			props.setRenderHamsters(!props.renderHamsters); 
			setRemoved(false)}}>
				Back to gallery
			</button>
		</div>
	)
}

export default GalleryHamster