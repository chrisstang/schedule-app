import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Container, Snackbar, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Title from './Title'

const EditSchedule = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [dateError, setDateError] = useState(null)
  const [isTextError, setIsTextError] = useState(false)

  const dateErrorMessage = React.useMemo(() => {
    if (dateError == 'disablePast') return 'Your date is not valid'
    return ''
  }, [dateError])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/schedules/${id}`)
      .then((response) => {
        setDate(dayjs(response.data.date))
        setTime(response.data.time)
        setDescription(response.data.description)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedSchedule = {
      date,
      time,
      description,
    }

    axios
      .post(`http://localhost:5000/schedules/update/${id}`, updatedSchedule)
      .then((response) => {
        setIsSnackbarOpen(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleTextField = (event) => {
    setDescription(event.target.value)
    if (event.target.value) {
      setIsTextError(false)
    } else {
      setIsTextError(true)
    }
  }

  return (
    <Container maxWidth="sm" className="mt-10">
      <Title>Edit Schedule</Title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DatePicker
            className="w-full"
            required
            label="Date*"
            value={date}
            disablePast
            onChange={(value) => setDate(value)}
            onError={(newError) => setDateError(newError)}
            slotProps={{
              textField: {
                helperText: dateErrorMessage,
              },
            }}
          />
          <TimePicker
            className="w-full"
            required
            label="Time*"
            fullWidth
            value={dayjs(time)}
            onChange={(value) => setTime(value)}
          />
          <TextField
            required
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            value={description}
            error={isTextError}
            helperText={isTextError ? 'Please enter your description' : null}
            onChange={handleTextField}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Schedule
          </Button>
        </form>
      </LocalizationProvider>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert seerity="success" sx={{ width: '100%' }} onClose={() => setIsSnackbarOpen(false)}>
          Edit Schedule successfully!
          <br />
          Redirecting to home page...
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditSchedule
