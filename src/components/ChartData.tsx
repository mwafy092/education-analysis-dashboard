import React, { FC, useEffect, useState } from 'react'
import '../styles/chart-data.css'
import { useSelector, useDispatch } from 'react-redux'
import { addDataToChartAction } from '../reducers/lessons'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { getSchoolsDataByCountryAndCamp } from '../utils/selectors'
import {
  ColorsInterface,
  SchoolsDataInterface,
  TopSchool,
  Lessons,
  StateTypes,
  lessonsDataTypes,
} from '../types'
const ChartData: FC = () => {
  const [colors, setColors] = useState<ColorsInterface>({})
  const [totalLessons, setTotalLessons] = useState<number>(0)
  const [schoolsData, setSchoolsData] = useState<SchoolsDataInterface>([])
  const [selectedInput, setSelectedInput] = useState<string[]>([])
  const [topSchool, setTopSchool] = useState<TopSchool>({})
  const dispatch = useDispatch()
  const { country, camp, school, chartData, educationData } = useSelector(
    (store: StateTypes) => store.lessons,
  )

  const handleRadioButton = (item: string) => {
    if (selectedInput.includes(item)) {
      const index = selectedInput.indexOf(item)
      const arrayCopy = [...selectedInput]
      arrayCopy.splice(index, 1)
      setSelectedInput(arrayCopy)
    } else {
      setSelectedInput((prevState: typeof selectedInput) => [...prevState, item])
    }
  }

  useEffect(() => {
    setSelectedInput([])
  }, [camp])

  useEffect(() => {
    let topSchoolByLessons = { lessons: 0, school: '' }
    for (const item of Object.keys(schoolsData)) {
      topSchoolByLessons =
        topSchoolByLessons.lessons < schoolsData[item]
          ? { lessons: schoolsData[item], school: item }
          : topSchoolByLessons
    }
    setSelectedInput([topSchoolByLessons.school])
    setTopSchool(topSchoolByLessons)
  }, [schoolsData])

  useEffect(() => {
    const chartColors = ['orange', 'purple', 'skyblue', 'red']
    const chartDataWithColors: ColorsInterface[] = []
    selectedInput.forEach((item: string, index: number) =>
      chartDataWithColors.push({ [item]: chartColors[index] }),
    )
    dispatch(addDataToChartAction(chartDataWithColors))
  }, [selectedInput, dispatch])
  // useEffect for running functions
  useEffect(() => {
    let totalLessons = 0
    for (const item of Object.keys(schoolsData)) {
      totalLessons += schoolsData[item]
    }
    setTotalLessons(totalLessons)
  }, [country, camp, schoolsData])

  useEffect(() => {
    const schoolsArray = getSchoolsDataByCountryAndCamp(educationData, country, camp)

    const lessonsData: lessonsDataTypes[] = []
    schoolsArray.forEach((sc: Lessons) => {
      lessonsData.push({ school: sc?.school || '', lessons: sc?.lessons || 0 })
    })

    const computedLessonsData: SchoolsDataInterface = {}
    lessonsData.forEach((ld: lessonsDataTypes) => {
      if (ld.school in computedLessonsData) {
        computedLessonsData[`${ld.school}`] += ld.lessons
      } else {
        computedLessonsData[`${ld.school}`] = ld.lessons
      }
    })

    if (school?.toLowerCase() === 'show all') {
      setSchoolsData(computedLessonsData)
    } else {
      setSchoolsData({
        [`${school}`]: computedLessonsData[school],
      })
    }
  }, [educationData, country, camp, school])

  useEffect(() => {
    let colorsObject: ColorsInterface = {}
    chartData.forEach((color: ColorsInterface) => {
      colorsObject = { ...colorsObject, ...color }
    })
    setColors(colorsObject)
  }, [chartData])

  if (!camp) {
    return (
      <div className='chart__data__container'>
        <div className='schools__data__container'>
          <p className='empty__state'>Please select country, camp and school to view data</p>
        </div>
      </div>
    )
  }
  return (
    <div className='chart__data__container'>
      {totalLessons ? (
        <div className='top__school__label'>
          {Object.keys(schoolsData).length > 1 ? (
            <div>
              <span>{topSchool.school}</span> is the top school with total{' '}
              <span>{topSchool.lessons}</span> lessons
            </div>
          ) : (
            <div>
              <span>{topSchool.school}</span> has <span>{topSchool.lessons}</span> lessons
            </div>
          )}
        </div>
      ) : null}
      {totalLessons ? (
        <div className='total__schools__data'>
          <h2>
            <span className='total__lessons__num'>{totalLessons}</span> lessons
          </h2>
          <p>in {camp}</p>
        </div>
      ) : (
        <div className='chart__data__container'>
          <div className='schools__data__container'>
            <p className='empty__state'>Please select school</p>
          </div>
        </div>
      )}

      <div className='schools__data__container'>
        {Object.keys(schoolsData).map((item: string, index: number) => (
          <div
            className='school__data'
            key={item}
            id={item}
            style={{
              color: colors[item] || 'gray',
            }}
          >
            {schoolsData[item] && (
              <RadioButtonCheckedIcon
                style={{ width: '20px', cursor: 'pointer' }}
                onClick={(e) => {
                  handleRadioButton(item)
                }}
              />
            )}

            {schoolsData[item] && (
              <div className='school__info'>
                <h3>
                  <span className='lesson__num'>{schoolsData[item]}</span> lessons
                </h3>
                <p>in {item}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartData }
