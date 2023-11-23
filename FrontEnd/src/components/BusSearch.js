import React, {useEffect, useState} from "react";
import "../styles/BusSearch.css"
import axios from "axios";
function BusSearch({setBusList}) {
    const searchBus = (inputValue) => {
        // const inputValue = event.target.value
        if(inputValue !== '') {
            axios.post(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/bus/searchBus/${inputValue}`)
            .then(res => {
                if(res.status === 200) {
                    setBusList(res.data.busData)
                } else if(res.status === 204) {
                    setBusList([])
                }
            })
        } else {
            axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/bus`)
            .then(res => {
                setBusList(res.data.busData)
            })
        }

    }
    return (
        <>
            <div className="busSearch-container">
                <div className="busSearch-body">
                    <input type="text" className="keyword" onChange={(e) => searchBus(e.target.value)}
                    placeholder="버스번호를 검색해 주세요"></input>
                    {/* <button className="searchBtn">검색</button> */}
                </div>
            </div>
        </>
    )
}

export default BusSearch