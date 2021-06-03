import { useState } from 'react'
import './gallery.css'
import { Link } from 'react-router-dom';
import Added from './Added'

const InputForm = () => {

	// const [ preView, setPreView ] = useState< null | string >(null)
	const [ name, setName ] = useState< string >('')
	const [ age, setAge ] = useState< string >('')
	const [ favFood, setFavFood ] = useState< string >('')
	const [ loves, setLoves ] = useState< string >('')
	const [ img, setImg ] = useState<  string >('')

	const [ nameTouched, setNameTouched ] = useState(false)
	const [ ageTouched, setAgeTouched ] = useState(false)
	const [ favFoodTouched, setFavFoodTouched ] = useState(false)
	const [ lovesTouched, setLovesTouched ] = useState(false)
	const [ imgTouched, setImgTouched ] = useState(false)
	const [ added, setAdded ] = useState(false)


	//Validering, ändra CSS

	//name
	let nameIsValid: boolean = true
	let nameErrorMessage: string = ''
	if( name === '' ) {
		nameIsValid = false
		nameErrorMessage = 'Please input your hamster´s name'
	}
	let nameClass = ''
	if( nameTouched ) {
		nameClass = nameIsValid ? 'valid' : 'error'
	} 
	
	//age
	const allowedAgeCharacters = '123456789'
	let ageIsValid: boolean = true
	let ageErrorMessage: string = ''
	if( age === '' ) {
		ageIsValid = false
		ageErrorMessage = 'Please input your hamster´s age'
	} else if ( !allowedAgeCharacters.includes(age[0])) {
		ageIsValid = false
		ageErrorMessage = 'Please input digit'
	}
	let ageClass = ''
	if( ageTouched ) {
		ageClass = ageIsValid ? 'valid' : 'error'
	}

	//favFood
	let favFoodIsValid: boolean = true
	let favFoodErrorMessage: string = ''
	if ( favFood === '' ) {
		favFoodIsValid = false
		favFoodErrorMessage = 'Please input your hamster´s favorite food'
	}
	let favFoodClass = ''
	if( favFoodTouched ) {
		favFoodClass = favFoodIsValid ? 'valid' : 'error'
	}

	//loves
	let lovesIsValid: boolean = true
	let lovesErrorMessage: string = ''
	if( loves === '' ) {
		lovesIsValid = false
		lovesErrorMessage = 'Please input your hamster´s favorite thing'
	}
	let lovesClass = ''
	if( lovesTouched ) {
		lovesClass = lovesIsValid ? 'valid' : 'error'
	}

	//img
	let imgIsValid: boolean = true
	let imgErrorMessage: string = ''
	if( img === '' ) {
		imgIsValid = false
		imgErrorMessage = 'Please input your hamster´s image'
	}
	let imgClass = ''
	if( imgTouched ) {
		imgClass = imgIsValid ? 'valid' : 'error'
	}

	let formIsInvaild = !nameIsValid || !ageIsValid || !favFoodIsValid || !lovesIsValid || !imgIsValid


	const postHamster = async () => {
		
		const hamsterRequest = {
			method: 'POST',
			headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify( { "name": name, "age": age, "favFood": favFood, "loves": loves, "imgName": img, "wins": 0, "defeats": 0, "games": 0} )
		}
		const hamsterResponse = await fetch('/hamsters', hamsterRequest )
		const hamsterData = await hamsterResponse.text()
		
		console.log(hamsterData);
		if(hamsterData) {
			setAdded(true)
		}
	}


	return (
		<div className="input-form-wrapper">
			<div className="input-form">
			{!added
			?
			<>
			<div>
				<label>Name: </label> 
				<input type="text" name="name" value={name} 
				 onBlur={() => setNameTouched(true)}
				 onChange={ event => {setName(event.target.value)}}
				 className={nameClass}
				 />
				 {nameTouched
				 ? <div className="error-message">{nameErrorMessage}</div>
				: null }
				
			</div>
			<div>
				<label>Age: </label> 
				<input type="text" name="age" value={age}
				onBlur={() => setAgeTouched(true)}
				onChange={ event => {setAge(event.target.value)}}
				className={ageClass}
				/>
				{ageTouched
				 ? <div className="error-message">{ageErrorMessage}</div>
				: null }
			</div>
			<div>
				<label>Favorite Food: </label> 
				<input type="text" name="favFood" value={favFood}
				onBlur={() => setFavFoodTouched(true)}
				onChange={ event => {setFavFood(event.target.value)}}
				className={favFoodClass}
				/>
				{favFoodTouched
				 ? <div className="error-message">{favFoodErrorMessage}</div>
				: null }
			</div>
			<div>
				<label>Loves: </label> 
				<input type="text" name="lovs" value={loves}
				onBlur={() => setLovesTouched(true)}
				onChange={ event => {setLoves(event.target.value)}}
				className={lovesClass}
				/>
				{lovesTouched
				 ? <div className="error-message">{lovesErrorMessage}</div>
				: null }
			</div>
			
			<div>
				<label>Image: </label> 
				<input type="text" name="imgName" value={img}
				onBlur={() => setImgTouched(true)}
				onChange={event => {setImg(event.target.value)}}
				className={imgClass}
				/>
				{imgTouched
				 ? <div className="error-message">{imgErrorMessage}</div>
				: null }
			</div>
			<div>
				<button 
				onClick={postHamster}
				disabled={formIsInvaild}>Add my hamster</button>
			</div>
			<Link to="/gallery" > <button>Back to Gallery</button> </Link>
			</>
		   : <Added />}
			
			
		</div>
		</div>
	)
}
 
export default InputForm