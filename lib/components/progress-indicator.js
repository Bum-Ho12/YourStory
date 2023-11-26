import React,{useEffect,useState} from 'react'
import {Svg,Circle} from 'react-native-svg'

const CircularProgressIndicator = ({ radius, strokeWidth, progress })=>{
        const circumference = 2 * Math.PI * radius;
        const [offset, setOffset] = useState(circumference)

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference
        setOffset(progressOffset)
    }, [progress, circumference])

    return (
        <Svg width={radius * 2} height={radius * 2}>
            <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="transparent"
            stroke="#E1E1E1" // Background color
            strokeWidth={strokeWidth}
            />
            <Circle
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                fill="transparent"
                stroke='#63bde1' // Progress color
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
        </Svg>
    )
}

export default CircularProgressIndicator