import React , {useEffect , useState} from 'react'
import '../styles/BusList.css'
import BusDetail from "../components/BusDetail"
import BusSearch from '../components/BusSearch'
import axios from 'axios'
function BusList({busList, setBusList, buttonState, setButtonState, 
    busListState, busPosition}) {
     // 선택된 버스의 상태를 저장하기 위한 스테이트 값
    const [discriptionState , setDiscriptionState] = useState(null)

    // 선택된 버스의 정보를 저장하기 위한 스테이트 값
    const [discription, setDiscription] = useState([])
    // const [routeCd , setRouteCd] = useState()
    const [busPositionInfoList ,setBusPositionInfoList] = useState([])
    const [upboundBusDetailList, setUpboundBusDetailList] = useState([])
    const [downBusDetailList, setDownBusDetailList] = useState([])

    const showDiscription = async(e, list, index) => {
        // console.log(list)
        // setRouteCd(list.routeCd)
        if(list) {
            await axios.post(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/bus/detail/${list.routeCd}`)
            .then(res => {
                const busDatas = res.data.elements[0].elements[1].elements
                // console.log(busDatas)
                const busData = busDatas.map( (item) => {
                    const array = item.elements.map((data) => {
                        const name = data.name
                        if(data.elements) {
                            var nameValue = data.elements[0].text
                        }
                        const busData = {name : name , value : nameValue}
                        return busData
                    })
                    return array
                })
                let num = 0
                busData.forEach((items, index) => {
                    if(items[3].value === '2') {
                        num = index
                        return num
                    }
                })
                const upboundArray = busData.slice(0,num + 1)
                const downArray = busData.slice(num + 1 , busData.length)
                // console.log(num)

                setUpboundBusDetailList(upboundArray)
                setDownBusDetailList(downArray)
                setDiscription(busData)
            })
            .catch(function(error){
                console.log(error.message)
            })
            await axios.post(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/bus/positionInfo/${list.routeCd}`)
            .then(res => {
                // console.log(res)
                const busPositonDatas = res.data.elements[0].elements[1].elements
                if(busPositonDatas === undefined) {
                    setBusPositionInfoList([])
                    busPosition([])
                } else{
                    setBusPositionInfoList(busPositonDatas)
                    busPosition(busPositonDatas)
                }
            })
        }
        setDiscriptionState(index)
        // setOpen('open')
    }
    useEffect(() => {
        setDiscriptionState(null)
    },[busList])
    return (
        <>
        <BusSearch setBusList={setBusList}/>
        <div className='busList-container'>
            <div className='busList-contants'>
                {busList.length !==0 && busList.map( (item , index) => {
                    return (
                        <div key={index} className='busList-item' onClick={(e) => showDiscription(e, item, index)}>
                            <div className='busContainer'>
                                <span className={`bus-type Tp${item.routeTp}`}></span>
                                <strong>{item.routeNo}</strong>
                                <span className='bus-description'>{item.origin} - {item.lastStop}</span>
                            </div>
                            {discriptionState === index ?
                                <BusDetail 
                                    key={item.routeCd}
                                    BusData={discription}
                                    busPositionInfoList={busPositionInfoList}
                                    upboundBusDetailList={upboundBusDetailList}
                                    downBusDetailList={downBusDetailList}
                                    upbound={item.origin}
                                    down={item.lastStop}
                                    state={discriptionState}
                                    buttonState={buttonState}
                                    setButtonState={setButtonState}
                                    num={index}>
                                </BusDetail> 
                                : null
                            }
                        </div>
                    )
                })}
                {busList.length ===0 && <div className="busErrorDiv">데이터를 찾을 수 없습니다</div>}
            </div>
        </div>
        </>
    )
}
export default BusList