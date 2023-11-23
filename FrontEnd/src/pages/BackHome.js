import React, { useState, useEffect, useRef } from "react";
import { Header , BusAreaMap,
    BusList, BusAreaList, BusSelectBar, SearchContainer, Footer } from "../components"
import '../styles/BackHome.css'
import axios from 'axios'
import BusMap from "../components/BusMap";
function BackHome({userInfo}){
    // const [ userAddress , setUserAddress ] = useState([])
    const [ busAreaDetail , setBusAreaDetail] = useState([])
    const [ busPositon , setBusPositon ] = useState([])
    const [ busListState, setBusListState ] = useState(true)
    const [ busAreaListState, setBusAreaListState ] = useState(false)
    const [ mapState , setMapState ] = useState(true)
    const [ busAreaMapState, setBusAreaMapState ] = useState(false)
    const [ busPositonMapState ,setBusPositonMapState] = useState(false)
    const [ buttonState, setButtonState ] = useState(false)

    // useEffect( () => {
    //     const geo = new kakao.maps.services.Geocoder();
    //     let startAddressIndex = userInfo.address.lastIndexOf('동')
    //     const address = userInfo.address.substr(0,startAddressIndex + 1)
    //     geo.addressSearch(address , function(result , status) {
    //         if(status === kakao.maps.services.Status.OK) {
    //             const LatLng = new kakao.maps.LatLng(result[0].y, result[0].x)
    //             setUserAddress([
    //                 {
    //                     REST_NM : '중심지',
    //                     LAT : LatLng.Ma,
    //                     LOT : LatLng.La,
    //                 }
    //             ])
    //         }
    //     })
    // },[userInfo])

    const [ busList , setBusList ] = useState([])
    const busListApi = async() => {
       await axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/bus`)
        .then(res => {
            setBusList(res.data.busData)
        })
    }

    const [ busAreaData , setBusAreaData ] = useState([])
    const busAreaListAPI = async() => {
        await axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/busArea`)
        .then(res => {
            setBusAreaData(res.data.BusAreas)
        })
    }
    useEffect(() => {
        busListApi()
        busAreaListAPI()
    } , [])

    // useEffect( () => {
    //     axios.get('http://127.0.0.1:5300/busArea/info')
    //     .then(res => {
    //         console.log(res)
    //         const busDatas = res.data.elements[0].elements[1].elements
    //         const busData = busDatas.map( (item) => {
    //             const array = item.elements.map((data) => {
    //                 const name = data.name
    //                 const nameValue = data.elements[0].text
    //                 const busData = {name : name , value : nameValue}
    //                 return busData
    //             })
    //             return array
    //        })
    //        setBusDatas(busData)
    //     })
    // } , [])

    const keywordSearch = (e) => {
        const searchKeyword = document.querySelector('.keyword')
        if(searchKeyword.value !== null && searchKeyword.value !== '') {
            axios.post(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/busArea/search/${searchKeyword.value}`)
            .then(res => {
                console.log(res)
            })
            .catch(function(error) {
                if(error.response.data.code === 400) {
                    alert(error.response.data.message)
                }
            })
        } else {
            alert('다시 검색해 주세요!!')
        }
    }
    const busPosition = (busPositionData) => {
        // console.log(busPositionData)
        setMapState(true)
        setBusPositon(busPositionData)
        setBusPositonMapState(true)
    }
    const busAreaPosition = (busItem) => {
        // console.log(busItem)
        setBusAreaDetail(busItem)
        setMapState(false)
    }
    return(
       <>
            <Header/>
            <div className='backHome'>
                <div className="backHome-container">
                    <BusSelectBar busListState={busListState} setBusListState={setBusListState} setMapState={setMapState}
                    setBusPositonMapState={setBusPositonMapState} setBusAreaMapState={setBusAreaMapState}
                    busAreaListState={busAreaListState} setBusAreaListState={setBusAreaListState}
                    busListApi={busListApi} busAreaListAPI={busAreaListAPI}/>
                    {busListState ? <BusList busList={busList} setBusList={setBusList} buttonState={buttonState} 
                    setButtonState={setButtonState} busListState={busListState} busPosition={busPosition}/> : ''}
                    {busAreaListState ? <BusAreaList busAreaData={busAreaData} setBusAreaData={setBusAreaData} busAreaPosition={busAreaPosition}/> : ''}
                </div>
                {/* {mapState ?  <DefaultMap/> : ''} */}
                {/* {busPositonMapState ? <BusMap busPositon={busPositon} 
                                    busPositonMapState={busPositonMapState} buttonState={buttonState}/> : '' }
                {busAreaMapState ? <BusAreaMap userInfo={userAddress} busAreaDetail={busAreaDetail}
                                        mapState={mapState} busAreaMapState={busAreaMapState}/> : '' } */}
                {mapState ? <BusMap busPositon={busPositon} busPositonMapState={busPositonMapState} buttonState={buttonState}/>                 
                                :
                            <BusAreaMap busAreaDetail={busAreaDetail} mapState={mapState} busAreaMapState={busAreaMapState}/> }
            </div>
            <Footer userInfo={userInfo}/>
       </>
    )
}

export default BackHome