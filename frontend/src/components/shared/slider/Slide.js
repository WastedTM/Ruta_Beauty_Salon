import React from "react";

export default function Slide(item, index) {
    return (
        <div key={index} className={"slider-box"}>
            <img src={item.name} alt={item.title}></img>
            <div className={"text"}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
            </div>
        </div>
    )
}