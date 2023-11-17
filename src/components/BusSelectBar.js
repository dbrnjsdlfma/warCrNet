import React , {useEffect, useState} from 'react'
import '../styles/BusSelectBar.css'
function BusSelectBar({busListState, setBusListState, busListApi, busAreaListAPI, setMapState ,setBusAreaMapState, setBusPositonMapState,
    busAreaListState, setBusAreaListState}) {
    const onBusList = () => {
        setBusListState(true)
        setBusAreaListState(false)
        setBusAreaMapState(false)
        setBusPositonMapState(false)
        setMapState(true)
        busListApi()
    }
    const onBusAreaList = () => {
        setBusListState(false)
        setBusAreaListState(true)
        setBusAreaMapState(true)
        setBusPositonMapState(false)
        setMapState(false)
        busAreaListAPI()
    }
    return (
        <div className='busSelectBar-container'>
            <div className='busSelectBar-contants'>
                <button className={`busList-button ${busListState ? 'on' : ''}`} onClick={onBusList}>버스 리스트</button>
                <button className={`busAreaList-button ${busAreaListState ? 'on' : ''}`} onClick={onBusAreaList}>정류장 리스트</button>
            </div>
        </div>
    )
}

export default BusSelectBar