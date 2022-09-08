import React, { FC, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import '../styles/chart.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { months, sortBasedOnMonth } from '../utils/tools'
import { ColorsInterface, Lessons, SectionData, StateTypes } from '../types'
import 'chart.js/auto'

const Chart: FC = () => {
  const navigate = useNavigate()
  const [colors, setColors] = useState<ColorsInterface>({})
  const [lineChartData, setLineChartData] = useState<Lessons[] | SectionData>([])
  const { chartData, country, camp, educationData } = useSelector(
    (state: StateTypes) => state.lessons,
  )

  useEffect(() => {
    let colorsObject: ColorsInterface = {}
    chartData.forEach((color: ColorsInterface) => {
      colorsObject = { ...colorsObject, ...color }
    })
    setColors(colorsObject)
  }, [chartData])
  useEffect(() => {
    const educationDataPerCamp = educationData[country]?.[camp] || []
    let sectionData: SectionData = {}
    for (const i of Object.keys(educationDataPerCamp)) {
      sectionData = {
        ...sectionData,
        [`${i}`]: sortBasedOnMonth(Object.values(educationDataPerCamp[i])),
      }
    }
    console.log(sectionData)

    const _CHART_DATA: Lessons[] = []
    for (const i of chartData) {
      const key: string = Object.keys(i)[0]

      _CHART_DATA.push(sectionData[key])
    }

    setLineChartData(_CHART_DATA)
  }, [camp, chartData, country, educationData])

  return (
    <div className='chart__container'>
      <h3>No of lessons</h3>
      <div className='chart'>
        <Line
          data={{
            labels: months,
            datasets: lineChartData?.map((data: Lessons[], _index: number) => {
              if (data && chartData.length !== 0) {
                const dataChunk = data[0]?.school || ''
                return {
                  label: dataChunk,
                  data: data,
                  borderColor: colors[dataChunk],
                  tension: 0,
                }
              } else {
                return {
                  label: [],
                  data: [],
                  borderColor: [],
                  tension: 0,
                }
              }
            }),
          }}
          options={{
            onClick: (evt, activeElement: any) => {
              const pointData: Lessons = activeElement[0]?.element?.$context.raw
              navigate('/details', {
                state: pointData,
              })
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            parsing: {
              xAxisKey: 'month',
              yAxisKey: 'lessons',
            },
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 300,
                ticks: {
                  stepSize: 50,
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export { Chart }
