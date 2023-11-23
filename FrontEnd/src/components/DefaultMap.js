import React from 'react'
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"

function DefaultMap() {
    return (
        <>
            <Map
                center={{
                    lat : 36.3504119 ,
                    lng : 127.3845475 ,
                }}
                style={{
                    width : "80%",
                    height : "100%",
                }}
                level={5}>                  
                </Map>
        </>
    )
}

export default DefaultMap