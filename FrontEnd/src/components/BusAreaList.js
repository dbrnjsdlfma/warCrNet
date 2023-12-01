import React, { useEffect, useState } from 'react'
import BusAreaItem from './BusAreaItem'
import axios from 'axios'
import BusAreaSearch from '../components/BusAreaSearch'
import '../styles/BusAreaList.css'
function BusAreaList({busAreaData, setBusAreaData, busAreaPosition}) {
    // console.log(busAreaData)
    const [discriptionState , setDiscriptionState] = useState(null)
    const [busStateList, setBusStateList] = useState([])
    const busStateOnClick = (e, item, index) => {
        axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/busArea/busList/${item.BUS_NODE_ID}`)
        .then(res => {
            const busDatas = res.data.elements[0].elements[1].elements
            const array = []
            busDatas.map( (item) => {
                // console.log(item)
                item.elements.map((data) => {
                    const name = data.name
                    if(name === 'INFO_OFFER_TM' || name === 'EXTIME_MIN' || name === 'DESTINATION'
                    || name === 'ROUTE_NO' || name === "ROUTE_TP" || name === 'STATUS_POS') {
                        const nameValue = data.elements[0].text
                        const busData = {name : name , value : nameValue}
                        array.push(busData)
                    }
                    // if(data.elements) {
                    // }
                    // return busData
                })
                // return array
            })
            let num = 6
            const sliceArray = []
            for(let i=0; i<array.length; i+=num ) {
                sliceArray.push(array.slice(i , i+num))
            }
            // console.log(sliceArray)
            setBusStateList(sliceArray)
        })
        busAreaPosition(item)
        setDiscriptionState(index)
    }
    useEffect(() => {
        setDiscriptionState(null)
    },[busAreaData])
    return (
        <>
            <BusAreaSearch setBusAreaData={setBusAreaData}/>
            <div className='backHome-list'>
                {busAreaData.length !==0 && busAreaData.map((item , index) => {
                    return (
                        <div key={index} className="busArea-contents" onClick={(e) => busStateOnClick(e, item, index)}>
                            <div className='busArea-List'>
                                <span>{item.BUSSTOP_NM}</span>
                                <p>{item.BUS_STOP_ID}</p>
                            </div>
                            {discriptionState === index ? 
                                <BusAreaItem key={item._id} busStateList={busStateList}/> : null
                            }
                        </div>
                    )
                })}
                {busAreaData.length ===0 && <div className="busErrorDiv">데이터를 찾을 수 없습니다</div>}
            </div>
        </>
    )
}

export default BusAreaList