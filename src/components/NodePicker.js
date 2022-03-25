function NodePicker(props) {
  return (
    <select id={props.id} className='control-button turn-yellow' name='nodeType'>
        <option value="target">Place Target</option>
        <option value="start">Place Start</option>
        <option value="obstacle">Place Obstacle</option>
        <option value="erase">Erase</option>
    </select>
  )
}

export default NodePicker