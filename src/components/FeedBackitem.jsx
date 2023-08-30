import {FaTimes, FaEdit} from 'react-icons/fa'
import { useContext } from 'react'
import PropTypes from 'prop-types'
import Card from "./sharedd/Card"
import FeedbackContext from '../context/FeedbackContext'



function FeedBackitem({item}) {
  const {deleteFeedback, editFeedback} = useContext(FeedbackContext)

  return (
    <Card >
        <div className="num-display">{item.rating}</div>
        <button onClick={()=>deleteFeedback(item.id)} className="close">
          <FaTimes color='#1E5128'/>
        </button>
        <button onClick={()=> editFeedback(item )} className="edit">
          <FaEdit color="#1E5128"/>
        </button>
        <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedBackitem.propTypes= {
    item: PropTypes.object.isRequired,
}
export default FeedBackitem