import React from "react";

function BusItem({items}) {
    return (
        <li key={items[1].value}>
            <div className="busLine"></div>
            <span className="material-symbols-outlined busimage"
                id={`${items[5].value}`}>
                directions_bus
            </span>
            <div className="busDescription">
                <span className="busAreaName">{items[1].value}</span>
                <span className="busAreaRouteCd">{items[5].value}</span>
            </div>
        </li>
    )
}

export default React.memo(BusItem)