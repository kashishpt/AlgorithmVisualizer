import PropTypes from 'prop-types'
import {addObstacle, setTarget, setStart, erase} from '../algorithms/Dijkstras.js'

function Vertex(props) {
  let my_id = props.column.toString() + ',' + props.row.toString()

  return (
    <div>
          <button onClick={() => click(my_id)} className='vertex' id={my_id} />
    </div>
  )
}

const click = (my_id) => {
  let type = document.getElementById('nodeTypePicker').selectedIndex
  if (type == 0)
    setTarget(my_id)
  else if (type == 1)
    setStart(my_id)
  else if (type == 2)
    addObstacle(my_id)
  else if (type == 3) {
    erase(my_id)
  }
  // dijkstras(my_id, maxHeight, maxWidth)
}


Vertex.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
}

Vertex.defaultProps = {
  color: 'blue'
}

export default Vertex