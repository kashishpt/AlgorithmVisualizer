import {length, height} from './Grid'
import {erase} from '../algorithms/Dijkstras.js'

function Button(props) {
    return (
        <button id={props.id} className={props.class} onClick={props.onClick}>{props.content}</button>
  )
}


export default Button