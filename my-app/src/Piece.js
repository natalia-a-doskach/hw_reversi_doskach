import blackCounter from '../assets/black-counter.svg'
import whiteCounter from '../assets/white-counter.svg'

function Piece(props) {
    const player = props.data === 'O' ? 'white' : 'black'

    return (
        <img src={player === 'white' ? whiteCounter : blackCounter} className={'piece'} />
    )
}
