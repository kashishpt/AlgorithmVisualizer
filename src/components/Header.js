import Row from './Row.js'
import Start from './Start.js'
import PropTypes from 'prop-types'
import NodePicker from './NodePicker.js'
import Reset from './Reset.js'


const Header = (props) => {
  
  let list = []
  for (let i = 0; i < props.height; i++) {
    list.push(
      <Row row={props.height - 1 - i} height={props.height} length={props.length}/>
    )
  }


  return (
    <div>
      <div id='container'>
        {list}
      </div>
      <NodePicker />
      <Start length={props.length} height={props.height}/>
      <Reset length={props.length} height={props.height}/>
    </div>
)}

Header.defaultProps = {
  height: 25,
  length: 25
}

Header.propTypes = {
  length: PropTypes.number,
  height: PropTypes.number
}

export default Header