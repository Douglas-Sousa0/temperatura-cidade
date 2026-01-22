function Bloco(props){
    return(
        <div className='bloco_dado'>
            <span className='topico_bloco'>{props.topico}</span>
            <span className='valor_topico'>{props.valor}</span>
        </div>
    )
}

export default Bloco