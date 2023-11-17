import React , { useState, useEffect } from 'react'
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import DefaultMap from './DefaultMap'
function BusMap({busPositon, busPositonMapState, buttonState}) {
    const [ positions, setPositions ] = useState([])
    const LatLotClassify = (data) => {
        const busData = data.map((items) => {
            const array = items.elements.map((item, index) => {
                if(item.name === 'GPS_LATI') {
                    var LAT = item.elements[0].text
                }
                if(item.name === 'GPS_LONG') {
                    var LOT = item.elements[0].text
                }
                return {LAT : LAT , LOT : LOT}
            })
            return array
        })

        return busData
    }
    useEffect(() => {
        const upboundBusList = []
        const downBusList = []
        if(busPositon.length !== 0) {
            busPositon.forEach((item) => {
                item.elements.forEach((data) => {
                    const name = data.name
                    const nameValue = data.elements[0].text
                    if(name === 'ud_type' && nameValue === '0') {
                        upboundBusList.push(item)
                    } else if(name === 'ud_type' && nameValue === '1'){
                        downBusList.push(item)
                    }
                })
            })
        }
        if(buttonState) {
            setPositions(LatLotClassify(downBusList))
        } else {
            setPositions(LatLotClassify(upboundBusList))
        }
    },[busPositon, buttonState])
    if(busPositonMapState && positions.length !== 0) {
        return (
            <>
                <Map
                    key={0}
                    // center={{
                    //     lat : 36.3504119 ,
                    //     lng : 127.3845475 ,
                    // }}
                    center={{
                        lat : positions[0][5].LAT ,
                        lng : positions[0][6].LOT ,
                    }}
                    style={{
                        width : "80%",
                        height : "100%",
                    }}
                    level={7}>
                    {positions.length !==0 ? positions.map( (items, i) => {
                            return (
                                    <>
                                        <MapMarker
                                            key={`lat-${items[5].LAT}_lot-${items[6].LOT}`}
                                            position={{
                                                lat : items[5].LAT ,
                                                lng : items[6].LOT
                                            }}
                                            image={{
                                                src: "./../images/busMaker.png",
                                                size: {
                                                    width: 30,
                                                    height: 35
                                                    },
                                                }}
                                        
                                        />
                                        {/* <CustomOverlayMap
                                            key={`${item.LAT},${item.LOT}`}
                                            position={{
                                                lat : item.LAT ,
                                                lng : item.LOT
                                            }}>
                                            <div className="customoverlay">
                                                <a>
                                                    <span className="title">{item.REST_NM}</span>
                                                </a>
                                            </div>
                                        </CustomOverlayMap> */}
                                    </>
                                )

                    }) : 
                    <DefaultMap/>
                    }
                </Map>
            </>
        )
    } else {
        return (
            <>
                <DefaultMap/>
            </>
        )
    }
}

export default React.memo(BusMap)