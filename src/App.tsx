import React, { useEffect, useState } from 'react';
import s from "./App.module.css";
import Graph from './components/graph';
import axios from 'axios';
import Form, { Inputs } from './components/Form';
import AllCards from './components/AllCards';
import { Box, Card, CardContent, CircularProgress, Switch, Typography } from '@mui/material';




function App() {
  return (
    <div className={s.App}>
      <div className={s.wrapper}>
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
}

export default App;

const Header = () => {

  return <div>

  </div>
}

export type SearchUserType = {
  _id: string
  date: string
  hour: string
  __v: number
}

export type SearchResult = {
  items: SearchUserType[]
}

const Body = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [workTimeData, setWorkTimeData] = useState<SearchUserType[]>()
  const [date, setDate] = useState<string[]>()
  const [hour, setHour] = useState<number[]>()
  const [sendData, setSendData] = useState<Inputs>()
  const [editCard, setEditCard] = useState<SearchUserType | null>(null)
  const [deleteCard, setDeleteCard] = useState<string | null>(null)

  const [allminutes, setAllMinutes] = useState<number>(0)
  const [average, setAverage] = useState<number>(0)
  const [isCard, setIsCard] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    axios
      .get('https://serene-caverns-54014.herokuapp.com/api/hoursADay')
      .then(res => {
        setWorkTimeData(res.data)
        setIsFetching(false)
      })
  }, [])

  useEffect(() => {
    if (workTimeData) {
      let mapHours = workTimeData.map((item: SearchUserType) => { return Number(item.hour) })
      setHour(mapHours)
      let mapDate = workTimeData.map((item: SearchUserType) => { return item.date })
      setDate(mapDate)
    }
  }, [workTimeData])

  useEffect(() => {
    if (sendData) {
      setIsFetching(true)
      let revisedData = {
        "date": sendData.date.replace(/-/gi, '.'),
        "hour": sendData.hour.replace(/:/gi, '.')
      }
      axios
        .post('https://serene-caverns-54014.herokuapp.com/api/hoursADay', revisedData)
        .then(res => {
          setWorkTimeData((actual) => [...actual!, res.data])
          setIsFetching(false)
        })
    }
  }, [sendData])

  useEffect(() => {
    if (editCard) {
      setIsFetching(true)
      axios
        .put('https://serene-caverns-54014.herokuapp.com/api/hoursADay', editCard)
        .then(res => {
          setWorkTimeData((actual) => actual!.map(p => p._id === editCard._id ? { ...p, ['date']: res.data.date, ['hour']: res.data.hour} : p)) 
          setIsFetching(false)
    }) 
    }
      
  }, [editCard])

  useEffect(() => {
    if (deleteCard) {
      setIsFetching(true)
      axios
        .delete(`https://serene-caverns-54014.herokuapp.com/api/hoursADay/${deleteCard}`)
        .then(res => {
          setWorkTimeData((actual) => actual!.filter(p => p._id !== deleteCard))
          setIsFetching(false)
        })
    }
    
  }, [deleteCard])

  useEffect(() => {
    if (workTimeData) {
      setAllMinutes(workTimeData?.reduce((previous: number, item: any) => {
        let hourArr = (item.hour).split('.');
        let minutes = Number(hourArr[0]) * 60 + Number(hourArr[1]);        
        return minutes + previous
      }, 0))
    }
  }, [workTimeData])

  useEffect(() => {
    if (workTimeData) {
      setAverage((allminutes / workTimeData.length) / 60)
    }
  }, [allminutes])

  return <div>
    <Card >
      <CardContent >
        <Typography variant="subtitle1" >
          Total training time: {`${(allminutes / 60).toFixed(0)}h  ${(allminutes % 60)}min` }
        </Typography>
        <Typography variant="subtitle1" >
          Average learning time: {average.toFixed(1)}h per day.
        </Typography>
      </CardContent>
    </Card>
    {isFetching && <div className={s.isFetching}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    </div>}
    <Graph date={date} hour={hour} />
    <Form setSendData={setSendData} />
    <Switch onChange={() => { setIsCard(isCard ? false : true)}} />
    <span>Edit and view all card time</span>
    {isCard && <AllCards setDeleteCard={setDeleteCard} workTimeData={workTimeData} setEditCard={setEditCard} />}
  </div>
}

const Footer = () => {

  return <div>

  </div>
}


