import PropTypes from 'prop-types'
import NodePicker from './NodePicker.js'
import Grid from './Grid.js'
import DiagonalPicker from './DiagonalPicker.js'
import Button from './Button.js'
import {length, height} from './Grid.js'
import {erase, dijkstras, blockPath} from '../algorithms/Dijkstras'

const Header = (props) => {

const reset = () => {
  for (let x = 0; x < length(); x++)
      for (let y = 0; y < height(); y++)
          erase(x + ',' + y)
}



  return (
    <div>
        <div id='control-container'>
          <NodePicker id='picker-button'/>
          <Button id='start-button' class='control-button' onClick={() => dijkstras(height(), length())} content='Start'/>
          <Button id='reset-button' class='control-button' onClick={reset} content='Reset'/>
          <Button id='block-path-button' class='control-button' onClick={blockPath} content='Block Current Path' />
          <div class='vertical-flex'>
            <label id='speed-picker-label'>Speed</label>
            <input type='range' id='speed-picker' min='1' max='500'></input>
            <DiagonalPicker />
          </div>
        </div>
        <Grid />
      
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