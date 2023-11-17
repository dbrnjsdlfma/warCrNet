const express = require('express')
const expressAsyncHandler = require('express-async-handler')

const request = require('request')
const xmlConverter = require('xml-js')

const config = require('../config')
const { getStaionByRoute_URL, getBusPosByRtid_URL } = require('../urlManagement')

const Bus = require('../models/Bus')

const router = express.Router()

router.get('/' , expressAsyncHandler(async(req, res, next) => {
    const busData = await Bus.find().sort({ routeNo : 1})
    if(!busData) {
        res.status(400).json({code : 400 , message : "검색데이터를 찾을 수 없습니다."})
    } else {
        res.status(200).json({ code : 200 , busData})
    }
}))

router.post('/detail/:id' , expressAsyncHandler(async(req, res, next) => {
    const API_KEY = config.PUBLIC_DATA_POTAL_API_KEY
    const busRouteId = req.params.id

    if(busRouteId) {
        request (
            {
                url : getStaionByRoute_URL(API_KEY, busRouteId),
                method : "GET" ,
            },
            (error, response , body) => {
                console.log(body)
                const xmlData = xmlConverter.xml2json(body);
                res.send(xmlData)
            }
        )
    }
}))

router.post('/positionInfo/:id' , expressAsyncHandler(async(req, res, next) => {
    const API_KEY = config.PUBLIC_DATA_POTAL_API_KEY
    const busRouteId = req.params.id
    if(busRouteId) {
        request (
            {
                url :  getBusPosByRtid_URL(API_KEY, busRouteId),
                method : "GET" ,
            },
            (error, response , body) => {
                const xmlData = xmlConverter.xml2json(body);
                res.send(xmlData)
            }
        )
    }
}))

router.post('/searchBus/:id' , expressAsyncHandler(async(req, res, next) => {
    const busNum = req.params.id
    const busData = await Bus.find({
        $and : [
            { routeNo : { $regex : busNum }},
        ]
    })
    if(busData.length === 0) {
        res.status(204).json({code : 204 , message : "검색데이터를 찾을 수 없습니다."})
    } else {
        res.status(200).json({code : 200 , busData})
    }

}))

module.exports = router
