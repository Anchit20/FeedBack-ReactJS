// import {v4 as uuidv4} from 'uuid'
import { createContext, useState } from "react";
import { useEffect  } from 'react';

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedBack] =  useState([])

    const [feedbackEdit, setfeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(()=>{
        fetchFeedback()
        // console.log(123)
    },  [])

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedBack(data)
        setIsLoading(false)
    }

    const deleteFeedback = async(id) => {
        if(window.confirm('Are you sure you want to delete')){
            await fetch(`/feedback/${id}` , {method:'DELETE'})


        setFeedBack(feedback.filter((item)=> item.id !== id)) 
        }
    }

    const addFeedBack = async(newFeedBack) => {
        const response =  await fetch('/feedback',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedBack),
        })
        const data = await response.json()
        setFeedBack([data, ...feedback])
    }

    const updateFeedback = async(id, updItem) =>{
        const response = await fetch(`/feedback/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedBack(feedback.map((item)=>item.id === id ? data : item))

        setfeedbackEdit({
            item: {},
            edit: false,
        })
    }

    const editFeedback = (item) => {
        setfeedbackEdit({
            item,
            edit: true,
        })
    }
    
    return(
    <FeedbackContext.Provider 
    value={{
        feedback,
        feedbackEdit,
        isLoading, 
        deleteFeedback,
        addFeedBack,
        editFeedback,
        updateFeedback,
    }}
    >
        {children}
    </FeedbackContext.Provider>
    ) 
}
export default FeedbackContext; 