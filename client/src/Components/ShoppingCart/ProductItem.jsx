export default function ProductItem({data,addToCart}) {
    let {_id, name, price} = data;
    return <div>
        <h4>{name}</h4>
        <h5>${price}</h5>
        <button onClick={() => addToCart(_id)}>Agregar</button>
    </div>;
}

