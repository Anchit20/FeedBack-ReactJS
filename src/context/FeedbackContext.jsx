// // import {v4 as uuidv4} from 'uuid'
// import { createContext, useState } from "react";
// import { useEffect  } from 'react';

// const FeedbackContext = createContext()

// export const FeedbackProvider = ({children}) => {
//     const [isLoading, setIsLoading] = useState(true)
//     const [feedback, setFeedBack] =  useState([])

//     const [feedbackEdit, setfeedbackEdit] = useState({
//         item: {},
//         edit: false
//     })

//     useEffect(()=>{
//         fetchFeedback()
//         // console.log(123)
//     },  [])

//     const fetchFeedback = async () => {
//         const response = await fetch(`/feedback?_sort=id&_order=desc`)
//         const data = await response.json()
//         setFeedBack(data)
//         setIsLoading(false)
//     }

//     const deleteFeedback = async(id) => {
//         if(window.confirm('Are you sure you want to delete')){
//             await fetch(`/feedback/${id}` , {method:'DELETE'})


//         setFeedBack(feedback.filter((item)=> item.id !== id)) 
//         }
//     }

//     const addFeedBack = async(newFeedBack) => {
//         const response =  await fetch('/feedback',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newFeedBack),
//         })
//         const data = await response.json()
//         setFeedBack([data, ...feedback])
//     }

//     const updateFeedback = async(id, updItem) =>{
//         const response = await fetch(`/feedback/${id}`,{
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updItem)
//         })

//         const data = await response.json()

//         setFeedBack(feedback.map((item)=>item.id === id ? data : item))

//         setfeedbackEdit({
//             item: {},
//             edit: false,
//         })
//     }

//     const editFeedback = (item) => {
//         setfeedbackEdit({
//             item,
//             edit: true,
//         })
//     }
    
//     return(
//     <FeedbackContext.Provider 
//     value={{
//         feedback,
//         feedbackEdit,
//         isLoading, 
//         deleteFeedback,
//         addFeedBack,
//         editFeedback,
//         updateFeedback,
//     }}
//     >
//         {children}
//     </FeedbackContext.Provider>
//     ) 
// }
// export default FeedbackContext; 

import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })

    const data = await response.json()

    // NOTE: no need to spread data and item
    setFeedback(feedback.map((item) => (item.id === id ? data : item)))

    // FIX: this fixes being able to add a feedback after editing
    // credit to Jose https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768200#questions/16462688
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext