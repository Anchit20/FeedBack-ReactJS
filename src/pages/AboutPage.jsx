import Card from "../components/sharedd/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project</h1>
            <p>THis is a React App for product review </p>
            <Link to='/'>Back to home</Link>
        </div>
    </Card>
  )
}

export default AboutPage