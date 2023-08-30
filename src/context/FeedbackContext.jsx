import {v4 as uuidv4} from 'uuid'
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedBack] =  useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 6
        },
    ])

    const [feedbackEdit, setfeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete')){
        setFeedBack(feedback.filter((item)=> item.id !== id)) 
        }
    }

    const addFeedBack = (newFeedBack) => {
        newFeedBack.id = uuidv4()
        setFeedBack([newFeedBack, ...feedback])
    }

    const updateFeedback = (id, updItem) =>{
        setFeedBack(feedback.map((item)=>item.id === id ? {
           ...item, ...updItem 
        } : item))
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