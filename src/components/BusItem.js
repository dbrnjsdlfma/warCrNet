import React from "react";

function BusItem({items, array}) {
    return (
        <li key={items[1].value}>
            <div className="busLine"></div>
            <span className="material-symbols-outlined busimage"
                id={`${items[5].value}`}>
                directions_bus
            </span>
            <div className="busDescription">
                <span className="busAreaName">{array[1]}</span>
                <span className="busAreaRouteCd">{items[5].value}</span>
            </div>
        </li>
    )
}

export default React.memo(BusItem)