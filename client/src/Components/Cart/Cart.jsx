import React from 'react'
import s from './Cart.module.css'

export default function Cart({key, item, handlerQty, handlerRemove}) {


    return (
        <div className={s.container}>
            <div>
                <img src={item.imageUrl} alt={item.name} width='30px' height='30px'/>
            </div>
            <div>
                <h4>{item.name}</h4>
            </div> 
            <div>
                <span>${item.price}</span>
            </div>
            <select onChange={e=>handlerQty(item._id, e.target.value)} >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>      
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
            <button onClick={()=>{handlerRemove(item._id)}}>X</button>
        </div>
    )
}
