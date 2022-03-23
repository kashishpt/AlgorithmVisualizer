import Vertex from './Vertex.js'
import PropTypes from 'prop-types'

function Row(props) {

  let list = []
  for (let i = 0; i < props.length; i++) {
    list.push(
      <Vertex row={props.row} column={i} height={props.height} length={props.length}/>
    )
  }


  return (
      <div className='row'>
        {list}
      </div>

  )
}

Row.defaultProps = {
  length: 40
}

Row.propTypes = {
  length: PropTypes.number,
  row: PropTypes.number.isRequired
  
}

export default Row