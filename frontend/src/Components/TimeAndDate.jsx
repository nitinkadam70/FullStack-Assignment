import React, { useEffect, useState } from 'react'

const TimeAndDate = () => {
    const [clock, setClock] = useState(new Date())

    // useEffect(() => {
    //     const ID = setInterval(() => {
    //         setClock(new Date());
    //     }, 1000)
    //     return () => clearInterval(ID)
    // }, [])

    return {
        hours: clock.getHours(), minute: clock.getMinutes(), second: clock.getSeconds(),
        day: clock.getDay(), month: clock.getMonth(), year: clock.getFullYear()
    }

}

export default TimeAndDate