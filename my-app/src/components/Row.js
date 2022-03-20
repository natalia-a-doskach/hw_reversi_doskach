import Square from './Square'

function Row(props) {
    return (
        <tr>
            <th>{props.number}</th>
            {props.data.map((Piece, index) => {
                const column = String.fromCharCode(97 + index)

                return (
                    <Square
                        key={index*10 + props.number}
                        row={props.number}
                        column={index}
                        onClick={props.onClick}
                    >
                        {Piece && <Piece/>}
                    </Square>
                )
            })}
            <th>{props.number}</th>
        </tr>
    )
}

export default Row
