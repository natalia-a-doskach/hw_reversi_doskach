function Square(props) {
    const isEvenRow = (props.row % 2 === 0)
    const isEvenColumn = (props.column % 2 !== 0)
    const isLight = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn)

    return (
        <td className={'square ' + (isLight ? 'light' : 'dark')} onClick={() => props.onClick(props.row,props.column)}>
            {props.children}
        </td>
    )
}

export default Square
