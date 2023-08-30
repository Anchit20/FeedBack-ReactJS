import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import { hasFormSubmit } from "@testing-library/user-event/dist/utils"
import FeedBackitem from "./FeedBackitem"
import FeedbackContext from '../context/FeedbackContext'


function FeedbackList() {
    const{feedback} = useContext(FeedbackContext)
    

if(!feedback || feedback.length === 0){
    return <p>NO feeback given</p>
}

return (
    <div className='feedback-list'>
    <AnimatePresence>
    {feedback.map((item)=> (
        <motion.div key={item.id}
        initial = {{opacity : 0}}
        animate = {{opacity : 1}}
        exit={{opacity : 0}}
        >
        <FeedBackitem
         key={item.id} 
         item={item}
         />
         </motion.div>
    ))}
    </AnimatePresence>
    </div>
  )

//     return (
//     <div className='feedback-list'>
//     {feedback.map((item)=>
//         <FeedBackitem
//          key={item.id} 
//          item={item} 
//          handleDelete={handleDelete}
//         />
//     )}
//     </div>
//   )
}

// FeedbackList.PropTypes = {
//     feedback: PropTypes.arrayOf({
//         id: PropTypes.number.isRequired,
//         text:  PropTypes.string.isRequired,
//         rating: PropTypes.number.isRequired,
//     }
//     )
// }

export default FeedbackList