import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { Container } from '@mui/system'
import { Alert, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Snackbar } from '@mui/material'
import dayjs from 'dayjs'
import formatTime from '../utils/formatTime'
import Title from './Title'

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/schedules')
      .then((response) => {
        setSchedules(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/schedules/${id}`)
      .then((response) => {
        setSchedules(schedules.filter((schedule) => schedule._id !== id))
        setIsSnackbarOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Container maxWidth="sm" className="mt-10">
      <Title>Schedule List</Title>
      <List className="space-y-5">
        {schedules.map((schedule) => (
          <ListItem
            key={schedule._id}
            className="rounded-md bg-neutral-100 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <ListItemText
              primary={<h4 className="font-semibold">{schedule.description}</h4>}
              secondary={
                <>
                  Date: {dayjs(schedule.date).format('DD/MM/YYYY')}
                  <br />
                  Time: {formatTime(schedule.time)}
                </>
              }
            />
            <ListItemSecondaryAction className="space-x-4">
              <IconButton component={Link} to={`/edit/${schedule._id}`}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(schedule._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert seerity="success" sx={{ width: '100%' }} onClose={() => setIsSnackbarOpen(false)}>
          Delete Schedule successfully
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ScheduleList
