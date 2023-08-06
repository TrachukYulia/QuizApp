import React, { useContext, useEffect, useState } from 'react'
import { useStateContext } from '../hooks/useStateContext'
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from '../api';
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography, stepConnectorClasses } from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  let timer;
  const { context, setContext } = useStateContext()
  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const navigate = useNavigate()

  const startTime = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1)
    }, [1000])
  }
  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions]
    temp.push({
      qnId,
      selected: optionIdx
    })
    if (qnIndex < 4) {
      setContext({ selectedOptions: [...temp] })
      setQnIndex(qnIndex + 1)
    }
    else {
      setContext({ selectedOptions: [...temp], timeTaken })
      navigate("/result")
    }
  }

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => {
        setQns(res.data)
        startTime()
        console.log(res.data)
      })
      .catch(err => { console.log(err) })
    return () => { clearInterval(timer) }
  }, []
  )
  return (
    qns.length != 0
      ? <Card
        sx={{
          maxWidth: 640, mx: 'auto', mt: 5,
          '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
        }}
      >
        <CardHeader
          title={'Question ' + (qnIndex + 1) + ' of 5'}
          action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
        <Box>
          <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / 5} />
        </Box>
        {qns[qnIndex].imageName != null
          ? <CardMedia
            component="img"
            image={BASE_URL + 'images/' + qns[qnIndex].imageName}
            sx={{ width: 'auto', m: '10px auto' }} />
          : null}
        <CardContent >
          <Typography variant="h6">
            {qns[qnIndex].qnInWords}
          </Typography>
          <List>{
            qns[qnIndex].options.map((item, idx) =>
              <ListItemButton key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}
              >
                <div>
                  <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                </div>

              </ListItemButton>
            )}
          </List>
        </CardContent>
      </Card>
      : null
  )
}
