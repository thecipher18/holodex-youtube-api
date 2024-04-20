"use client";

import React, { useState } from 'react'

type VTuberInfoProps = {
  name: string,
  description: string,
}

const VTuberInfo = (props: VTuberInfoProps) => {

  const { name, description } = props;

  const [ number, setNumber ] = useState<number>(0);

  const jsonData = [
    {
      "name": "Kizuna AI",
      "description": "Ai vtubeksjhfaskh"
    },
    {
      "name": "Kaguya Luna",
      "description": "Luna vtubeksjhfaskh"
    },
    {
      "name": "Mirai Akari",
      "description": "Akari vtubeksjhfaskh"
    }
  ]

  const handleClick = () => {
    setNumber(number + 1);
  }

  return (
    <div className='info'>
      {
        jsonData.map((data) => {
          return (
            <div key={data.name}>
              <h1>{data.name}</h1>
              <p>{data.description}</p>
            </div>
          )
        })
      }
      <button onClick={handleClick}>Click me</button>
      <p>{number}</p>
      <button>call api</button>
    </div>
  )
}

export default VTuberInfo