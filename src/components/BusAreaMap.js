import React , { useState, useEffect } from 'react'
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"
import DefaultMap from './DefaultMap'
function BusAreaMap({busAreaDetail, busAreaMapState}) {
    // useEffect(() => {
    //     if(busAreaData.length !==0) {
    //         const list = busAreaData.map((item) => {
    //             const data = {
    //                 REST_NM : item.NODENM ,
    //                 LAT : item.LATITUDE ,
    //                 LOT : item.LONGITUDE ,
    //                 key : item.NODEID ,
    //             }
    //             return data
    //         })
    //         setMapBusAreaData(list)
    //     } else {
    //         return
    //     }
    // },[busAreaData])
    if(busAreaMapState && busAreaDetail.length === 0) {
        return (
            <DefaultMap/>
        )
    } else {
        return (
            <>
                <Map
                    center={{
                        lat : busAreaDetail.GPS_LATI ,
                        lng : busAreaDetail.GPS_LONG ,
                    }}
                    style={{
                        width : "80%",
                        height : "100vh",
                    }}
                    level={1}>
                        <MapMarker
                            position={{
                                lat : busAreaDetail.GPS_LATI ,
                                lng : busAreaDetail.GPS_LONG ,
                            }}
                            image={{
                                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                                size: {
                                    width: 24,
                                    height: 35
                                    },
                                }}
                            title={busAreaDetail.BUSSTOP_NM}
                        />                        
                        <CustomOverlayMap
                            key={`${busAreaDetail.GPS_LATI},${busAreaDetail.GPS_LONG}`}
                            position={{
                                lat : busAreaDetail.GPS_LATI ,
                                lng : busAreaDetail.GPS_LONG ,
                            }}>
                            <div className="customoverlay">
                                <a>
                                    <span className="title">{busAreaDetail.BUSSTOP_NM}</span>
                                </a>
                            </div>
                        </CustomOverlayMap>                           
                    </Map>
            </>
        )

    }
}

export default BusAreaMap