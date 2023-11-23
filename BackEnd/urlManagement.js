const getArrInfoByStopID_URL = (apiKey , ID) => {
    const url = `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${apiKey}&BusStopID=${ID}`
    
    return url
}

const getStaionByRoute_URL = (apiKey, ID) => {
    const url =`http://openapitraffic.daejeon.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=${apiKey}&busRouteId=${ID}`

    return url
}

const getBusPosByRtid_URL = (apiKey, ID) => {
    const url = `http://openapitraffic.daejeon.go.kr/api/rest/busposinfo/getBusPosByRtid?serviceKey=${apiKey}&busRouteId=${ID}`

    return url
}
module.exports = {
    getArrInfoByStopID_URL , 
    getStaionByRoute_URL ,
    getBusPosByRtid_URL ,
}