function ShowItem(item, key){
    return (
        <div key={key} className="item_container">
            <img src={item.path} alt={item.alt_prop}></img>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
        </div>
    )
}

export default ShowItem;