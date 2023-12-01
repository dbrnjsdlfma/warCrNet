import React, { useEffect, useState } from 'react'
import '../styles/BusAreaItem.css'
function BusAreaItem({busStateList}) {
    const [ busList , setBusList ] = useState([])
    // useEffect(() => {
    //     const array = []
    //     busStateList.map((list)=> {
    //         list.map((item) => {
    //             if(item.name === 'BUS_STOP_ID' || item.name === 'EXTIME_MIN' || item.name === 'DESTINATION'
    //             || item.name === 'ROUTE_NO' || item.name === "ROUTE_TP" || item.name === 'STATUS_POS') {
    //                 array.push(item)
    //             }
    //         })
    //     })
    //     let num = 6
    //     const sliceArray = []
    //     for(let i=0; i<array.length; i+=num ) {
    //         sliceArray.push(array.slice(i , i+num))
    //     }
    //     setBusList(sliceArray)
    // },[busStateList])
    // console.log(busList)
    return (
        <div className="busAreaItemContainer">
            {busStateList.map((item, index)=> {
                return (
                    <div key={item[3].value} className='busAreaItem'>
                         <div className='busAreaItem-busRoute'>
                            <span className={`bus-type Tp${item[4].value}`}>{item[3].value}</span>
                            <p><strong>{item[1].value}</strong>분</p>
                            <p><strong>{item[5].value}</strong>정거장 전</p>
                        </div>
                        <p>{item[0].value}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(BusAreaItem)