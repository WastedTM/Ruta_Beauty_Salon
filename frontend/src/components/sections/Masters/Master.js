export default function Master({item}){
    return(
        <div className={'item_container'}>
            <img src = {item.image} alt = {item.title}></img>
            <h3>{item.title}</h3>
            <p>{item.qualification}</p>
        </div>
    )
}