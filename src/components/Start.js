import {dijkstras} from '../algorithms/Dijkstras'

function Start(props) {
  return (
    <button onClick={() => dijkstras(props.height, props.length)}>Start</button>
  )
}

export default Start