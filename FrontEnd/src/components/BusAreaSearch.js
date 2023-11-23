import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../styles/BusSearch.css"
function BusAreaSearch({setBusAreaData}) {
    const [ searchValue, setSearchValue ] = useState('')
    const busAreaSearch_API = async(busArea) => {
        await axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/busArea/search/${busArea}`)
        .then(res => {
            if(res.data.code === 200) {
                return setBusAreaData(res.data.searchData)
            } else {
                return setBusAreaData([])
            }
        })
    }
    const busAreaList_API = async() => {
        await axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/busArea`)
        .then(res => {
            if(res.data.code === 200) {
                setBusAreaData(res.data.BusAreas)
            } else {
                setBusAreaData([])
            }
        })
    }
    const searchBusArea = (busArea) => {
        setSearchValue(busArea)
        // if(busArea !== '') {
        //     const searchCall = setTimeout(() => {
        //         busAreaSearch_API(busArea)
        //     }, 1500)
        //     return (() => clearTimeout(searchCall))
        // } else if(busArea === ''){
        //     axios.get('http://127.0.0.1:5300/busArea')
        //     .then(res => {
        //         console.log(res)
        //         if(res.data.code === 200) {
        //             setBusAreaData(res.data.BusAreas)
        //         } else {
        //             setBusAreaData([])
        //         }
        //     })
        // }
        if(busArea === '') {
            busAreaList_API()
        }
    }
    const searchClick = () => {
        if(searchValue !== '' ) {
            busAreaSearch_API(searchValue)
        } else if(searchValue === '') {
            busAreaList_API()
        }
    }
    return (
        <>
            <div className="busSearch-container">
                <div className="busSearch-body">
                    <input type="text" className="keyword" onChange={(e) => searchBusArea(e.target.value)}
                    placeholder="정류장를 검색해 주세요"></input>
                    <button className="areaSearch-btn" onClick={searchClick}>검색</button>
                </div>
            </div>
        </>
    )
}

export default BusAreaSearch