import spinner from '../assets/spinner.gif'

function Spinner() {
  return <img src={spinner}  alt='Loading...' style={{
    widht:'100px', margin:'auto',display:'block'
  }}/>
}

export default Spinner