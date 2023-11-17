const express = require('express')
const expressAsyncHandler = require('express-async-handler');
const router = express.Router()
const config = require('../config')
const request = require('request')
const xmlConverter = require('xml-js')

const { getArrInfoByStopID_URL } = require('../urlManagement')

const mongoose = require('mongoose')
const { Types : { ObjectId } } = mongoose

const BusArea = require('../models/busArea')
const BusAreaPosition = require('../models/busAreaPosition')

router.get('/' , expressAsyncHandler(async(req, res, next) => {
    const BusAreas = await BusArea.find().limit(200)
    const BusArealist = []
    for(let i=0; i<100; i++) {
        const randomNum = Math.floor(Math.random() * BusAreas.length + 1)
        BusArealist.push(BusAreas[randomNum])
    }
    res.status(200).json({ code : 200 , BusAreas})
}))

// router.get('/info' , expressAsyncHandler(async(req, res, next) => {
//     const apiKey = 'abTnJYWhS4V65lOoXKB95MWdE3SSnCIv3%2FPTURvVOjdlf%2B8eW0Em9KRomxvJxC3noeQejB91RWlAQys9DyJaLg%3D%3D'
//     const url = `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByUid?serviceKey=${apiKey}&arsId=32350`
//     request(
//         {
//             url : url ,
//             method : "GET" ,
//         }, 
//         (error, response , body) => {
//             const xmlData = xmlConverter.xml2json(body);
//             // res.send(xmlData)
//             res.json({code : 200 , xmlData})
//         }
//     )
// }))

router.get('/busList/:id', expressAsyncHandler(async(req, res, next)=> {
    const BusStopID = req.params.id
    const API_key = config.PUBLIC_DATA_POTAL_API_KEY
    request(
        {
            url : getArrInfoByStopID_URL(API_key, BusStopID) ,
            method : "GET" ,
        }, 
        (error, response , body) => {
            const xmlData = xmlConverter.xml2json(body);
            res.send(xmlData)
        }
    )
}))

router.get('/detailPositon/:name', expressAsyncHandler(async(req, res, next) => {
    const positionData = await BusAreaPosition.findOne()
    const detailName = req.params.name
    console.log(detailName)
}))

router.get('/search/:name', expressAsyncHandler(async(req, res, next) => {
    const BusDatas = await BusArea.find({
        $and : [
            { BUSSTOP_NM : {$regex: req.params.name}} ,
        ]
    })
    const distinctBusDataValues = await BusArea.find({
        $and : [
            { BUSSTOP_NM : {$regex: req.params.name}} ,

        ]
    }).distinct('BUS_STOP_ID')

    const test = await BusArea.aggregate([
        {
            $match : { BUSSTOP_NM : {$regex: req.params.name}} ,
        },
        {
            $group : {
                _id : "$BUSSTOP_NM" ,
                BUS_STOP_ID : { $addToSet : "$BUS_STOP_ID" } ,
            }  
        },
        {
            $unwind : "$BUS_STOP_ID"
        }
    ])
    console.log(test)

    const searchData = []
    console.log(distinctBusDataValues)
    if(distinctBusDataValues.length !==0) {
        for(let i=0; i<=distinctBusDataValues.length-1; i++) {
            const data = await BusArea.findOne({
                BUS_STOP_ID : String(distinctBusDataValues[i]),
            })
            searchData.push(data)
            // console.log(data)
        }
    }
    console.log(searchData)
    //  else {
    //     for(let i=0; i<=BusDatas.length-1; i++) {
    //         searchData.push(BusDatas[i])
    //     }
    // }
    // console.log(searchData)
    res.status(200).json({code : 200 , searchData})
    // const distinctBusData = await BusArea.find({
    //     $and : [
    //         { BUSSTOP_NM : {$regex: req.params.name}} ,
    //     ]
    // }).aggregate([
    //     {
    //         $match : {BUS_STOP_ID : distinctBusDataValue}
    //     }
    // ])
    // console.log(distinctBusData)
    // .distinct('BUS_STOP_ID')
    // .aggregate([
    //     { $match : BUS_STOP_ID }
    // ])
    // if(!BusDatas) {
    //     res.status(204).json({code : 204 , message : '요청하신 데이터를 찾을 수 없습니다.'})
    // } else {
    //     res.status(200).json({code : 200 , BusDatas})
    // }
    
}))
module.exports = router