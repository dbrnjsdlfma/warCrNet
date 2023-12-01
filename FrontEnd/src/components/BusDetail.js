import React , { useEffect } from "react"
import BusItem from "./BusItem"
import '../styles/BusDetail.css'
function BusDetail({BusData, busPositionInfoList, upboundBusDetailList, downBusDetailList,
    upbound, down , buttonState, setButtonState}) {
    // const [upboundBusDetailList, setUpboundBusDetailList] = useState([])
    // const [downBusDetailList, setDownBusDetailList] = useState([])
    // useEffect(() => {

    // } ,[BusData])
    // console.log(BusData)
    // console.log(busPositionInfoList)
    // console.log(upboundBusDetailList)
    // useEffect(() => {
    //     const upboundArray = BusData.slice(0,indexNum + 1)
    //     setUpboundBusDetailList(upboundArray)
    //     const downArray = BusData.slice(indexNum + 1 , BusData.length)
    //     setDownBusDetailList(downArray)
    // },[indexNum])
    useEffect(() => {
        const busIconSpan = document.querySelectorAll('li span:nth-child(2)')
        const busIconSpanList = []
        for(let i=0; i<=busIconSpan.length-1; i++) {
            if(i % 2 === 0) {
                busIconSpanList.push(busIconSpan[i])
            } 
        }
        if(busPositionInfoList.length !==0) {
            busIconSpanList.map((el, index) => {
                el.classList.remove('onload')
                busPositionInfoList.forEach((items) => {
                    items.elements.forEach((item, index) => {
                        if(index===2) {
                            if(item.elements[0].text === el.getAttribute('id')) {
                                el.classList.add('onload')
                            }
                        }
                    })
                })
            })
        }
        // const spanIdList = document.querySelectorAll('.busAreaRouteCd')
        // if(busPositionInfoList.length !== 0) {
        //     // console.log(spanIdList)
        //     busPositionInfoList.forEach((items) => {
        //         console.log(items.elements)
        //         items.elements.forEach((item, index) => {
        //             if(index === 2) {
        //                 upboundBusDetailList.forEach((datas,index) => {
        //                     datas.forEach((data, index) => {
        //                         if(item.elements[0].text === data.value) {
        //                             // spanIdList[i].classList.add('.onload')
        //                             console.log('test')
        //                         } else {
        //                             // spanIdList[i].classList.remove('.onload')
        //                             console.log('fass')
        //                         }
        //                     })
        //                 })
        //             }
        //         })
        //     })
        // }
        // console.log(spanIdList)
        // for(let i=0; i<=spanIdList.length; i++) {
        //     nameArray.push(nameId)
        // }

        // const testId = spanIdList[1].getAttribute('name')
        // console.log(testId)
        // for(let i=0; i<spanId.length; i++) {
        //     if(i%2 === 0) {
        //         console.log(spanId[i].id)
        //     }
        // }

    },[busPositionInfoList])
    const upboundClick = () => {
        setButtonState(false)
    }
    const downClick = () => {
        setButtonState(true)
    }
    return (
        <>
        {BusData.length !== 0 &&
            <div className="bus-detailContainer">
                <div className="bus-detail-btnContainer">
                    <button className={`detailBtn ${!buttonState ? 'upboundOn' : ''}`} onClick={upboundClick}>{upbound} 방향</button>
                    <button className={`detailBtn ${buttonState ? 'downOn' : ''}`} onClick={downClick}>{down} 방향</button>
                </div>
                <div className="bus-detail-list">
                    {!buttonState ? 
                        <ul>
                            {upboundBusDetailList.map((items) => {
                                return <BusItem key={items[0].value} items={items} />
                            })}
                        </ul> : 
                        <ul>
                            {downBusDetailList.map((items) => {
                                return <BusItem key={items[0].value} items={items} />
                            })}
                        </ul>
                    }

                </div>
            </div>
        }
        </>
    )
}

export default React.memo(BusDetail)