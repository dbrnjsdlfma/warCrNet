import React, {useState, useEffect} from "react";
import axios from 'axios'
function DaejeonBusAreaAPI() {
    const [busAreaData , setBusAreaData] = useState([])
    useEffect( () => {
        axios.get('http://127.0.0.1:5300/busArea')
        .then(res => {
            setBusAreaData(res.data.BusAreas)
        })
    } , [])
    return busAreaData
}

export default DaejeonBusAreaAPI