import Row from './Row.js'
const r = 20
const c = 45

function Grid() {

    let list = []
    for (let i = 0; i < r; i++) {
        let k = 'R' + i
      list.push(
        <Row key={k} row={r - 1 - i} height={r} length={c}/>
      )
    }



    return (
        <div id='container'>
            {list}
        </div>
    )
}

export function height() {
    return r
}

export function length() {
    return c
}



export default Grid