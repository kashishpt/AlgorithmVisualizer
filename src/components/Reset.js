import { erase } from "../algorithms/Dijkstras"

function Reset(props) {
  return (
    <button onClick={() => reset(props.height, props.length)}>Reset</button>
  )
}

function reset(maxHeight, maxLength) {
    for (let x = 0; x < maxLength; x++)
        for (let y = 0; y < maxHeight; y++)
            erase(x + ',' + y)
}

export default Reset