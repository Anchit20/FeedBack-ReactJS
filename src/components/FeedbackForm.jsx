import { useState,useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./sharedd/Card"
import Button from "./sharedd/Button"
import { useContext } from "react"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
const[text,setText] = useState('')
const[rating,SetRating] = useState(10)
const[btnDisabled, setbtnDisabled] = useState(true)
const[message, setMessage] = useState('')

const{addFeedBack, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

useEffect(()=>{
    if(feedbackEdit.edit === true){
        setbtnDisabled(false)
        setText(feedbackEdit.item.text)
        SetRating(feedbackEdit.item.rating)
    }
},[feedbackEdit])

const handleTextChange = (e) =>{
    if(text === ''){
        setbtnDisabled(true)
        setMessage(null)
    }
    else if(text !== '' && text.trim().length <= 10){
        setbtnDisabled(true)
        setMessage('Review must be atleast 10 characters')
    }
    else{
        setbtnDisabled(false)
        setMessage(null)
    }
    setText(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault() 
    
    if(text.trim().length> 10){
        const newFeedBack = {
             text,
             rating,
        }
        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedBack)
        }else{
            addFeedBack(newFeedBack) 
        }
        setText('')
    }
}

    return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service ?</h2>
            <RatingSelect select={SetRating}/> 
            <div className='input-group'>
                <input onChange={handleTextChange} type='text' placeholder="Review" value={text}/>
                <Button  type='submit' isDisabled={btnDisabled}>Send</Button>
                
            </div>
            {message && <div classname='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm