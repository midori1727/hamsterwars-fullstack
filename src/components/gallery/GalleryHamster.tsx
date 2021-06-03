import { useEffect, useState } from 'react'
import { HamsterObject, MatchObject } from '../types/Types'


const GalleryHamster = (props : any ) => {

	//Get matchWinner
	// const [ hamsterMatchData, setHamsterMatchData ] = useState< null | MatchWinner[] >(null)
	//get losers från matchWinner
	// const [ besegratHamster, setBesegratHamster ] = useState< null | MatchWinner[] >(null)
	// const [ loserId, setLoserId ] = useState< null | string[]  >(null)
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
				console.log(cleanedLoserId)

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
	},[])

	// useEffect (() => {

	// 	console.log(loserId);
		
		
	// 	const getLoserHamsters = async () => {
	// 		try {

	// 			// const ids = ['2oCJxu8wyjhi40Diyyqj', '3EfoUzYR5ajv4UcIxySK']
				
	// 			// const response = async () => {
	// 			// 	for(let id of ids) await fetch(`/hamsters/${id}`, { method: 'GET'})
	// 			// }

	// 			// console.log(testFunc(ids));
	// 			if(loserId) {
	// 				const response = await Promise.all(loserId.map(async id => fetch(`/hamsters/${id}`, { method: 'GET'}))) 
				
	// 			console.log(response);
	// 			// const data: HamsterObject[]  = response.forEach(res => response.json() )

	// 			const data = await Promise.all(response.map(r => r.json()))
	
	// 			console.log(data);
	// 			setLoserHamsters(data)

	// 		}

				
	// 		} catch (error) {
	// 			console.log(error);
				
	// 		}
	// 	}
	// 	getLoserHamsters()
	// },[loserId])


	// useEffect (() => {

	// 	loserId?.forEach(id => console.log('ここ' + id))
		
	// 	const getLoserHamsters = async () => {
	// 		try {
				
	// 			console.log(loserId);
	// 			const response =　loserId?.forEach(async id => await fetch(`/hamsters/${id}`, { method: 'GET'}))
				
	// 			// const response = await fetch(`/hamsters/${loserId}`, { method: 'GET'})
				 
				
	// 			console.log(response);
	// 			// const data  = await response.json()
	// 			// const data  = await response.json()
				
	// 		} catch (error) {
	// 			console.log(error);
				
	// 		}
	// 	}
	// 	getLoserHamsters()
	// },[loserId])

	///////////////////////////////////////////////////////////
	
	// useEffect(() => {
		
	// 	setBesegratHamster(hamsterMatchData)
	// 	console.log(besegratHamster);
		
	// },[hamsterMatchData])

	// useEffect(() => {
		
	// 	console.log(besegratHamster);
		
	// 	const NewState: any = besegratHamster?.map(hamster => hamster.loserId)
	// 	console.log(NewState)
	// 	setLoserId(NewState)
	// 	console.log(loserId)
		
	// },[besegratHamster])

	//Get alla hamsters, sen filter alla hamsters med loserId. Skapar en ny state med besegrat hamsters objekt
	// useEffect(() => {

	// 	const getLoserHamsters = async () => {
	// 		try {
	// 			const response = await fetch('hamsters', { method: 'GET'});
	// 			const data = await response.json();
	// 			console.log(data);
				
				
	// 		} catch (error) {
	// 			console.log(error);
				
	// 		}

	// 	}
	// 	getLoserHamsters()
	// },[])
	

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
					{/* <img src={`img/${props.selectedHamster.imgName}`} alt={props.selectedHamster.imgName}/> */}
					<section className="galleryHamster-info">
					<h2>{props.selectedHamster.name}</h2>
					<p>Age: {props.selectedHamster.age}</p>
					<p>Loves: {props.selectedHamster.loves}</p>
					<p>Favorite Food: {props.selectedHamster.favFood}</p>
					<p>Wins : {props.selectedHamster.wins}</p>
					<p>Defeats : {props.selectedHamster.defeats}</p>
					<p>Total game : {props.selectedHamster.games}</p>
					<p>{props.selectedHamster.name} has defeated:</p>
					<ul 
					// className="defeated-hamster"
					>
						{loserHamsters
						? 
						loserHamsters.map(hamster => (
							<li key={hamster.name}>
								<p>{hamster.name}</p>
								{/* {hamster.name} */}
							</li>))
						:
						<p>not yet</p>}
					</ul>
					</section>
					{/* <h2>{props.selectedHamster.name}</h2>
					<p>Age: {props.selectedHamster.age}</p>
					<p>Loves: {props.selectedHamster.loves}</p>
					<p>Favorite Food: {props.selectedHamster.favFood}</p>
					<p>Wins : {props.selectedHamster.wins}</p>
					<p>Defeats : {props.selectedHamster.defeats}</p>
					<p>Total game : {props.selectedHamster.games}</p>
					<p>{props.selectedHamster.name} has defeated:</p>
					<ul className="defeated-hamster">
						{loserHamsters
						? 
						loserHamsters.map(hamster => (
							<li key={hamster.name}>
								<p>{hamster.name}</p>
							</li>))
						:
						<p>not yet</p>}
					</ul> */}
					</div>
					<button onClick={removeHamster}>Remove this hamster</button>
					</>
					: <section className="removed">
						<p>removed!</p>
					  </section>
				}
			</section>
			<button className="galleryHamster-button" onClick={() => {props.setHideHamsters(false); props.setShowHamsterInfo(false); props.setRenderHamsters(!props.renderHamsters); setRemoved(false)}}>Back to gallery</button>
			
		</div>
	)
}

export default GalleryHamster