import React from 'react'

function NodePicker() {
  return (
    <select name='nodeType' id='nodeTypePicker' multiple>
        <option selected value="target">Target</option>
        <option value="start">Start</option>
        <option value="obstacle">Obstacle</option>
        <option value="erase">Erase</option>
    </select>
  )
}

export default NodePicker