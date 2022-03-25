function DiagonalPicker() {
  return (
    <div>
        <label htmlFor="diagonals">Diagonals</label>
        <input className='control-button' type="checkbox" id="diagonal-picker" name="diagonals" value="diagonal" />
    </div>
  )
}

export default DiagonalPicker