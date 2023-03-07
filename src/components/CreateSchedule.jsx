import React, { useState } from 'react'
import axios from 'axios'
import { Alert, Button, Container, Snackbar, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Title from './Title'

const CreateSchedule = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [dateError, setDateError] = useState(null)
  const [isTextError, setTextError] = useState(false)

  const dateErrorMessage = React.useMemo(() => {
    if (dateError == 'disablePast') return 'Your date is not valid'
  }, [dateError])

  const handleSubmit = (event) => {
    event.preventDefault()

    const newSchedule = {
      date,
      time,
      description,
    }

    axios
      .post('http://localhost:5000/schedules/add', newSchedule)
      .then((response) => {
        setDate('')
        setTime('')
        setDescription('')
        setIsSnackbarOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleTextField = (event) => {
    setDescription(event.target.value)
    if (event.target.value) {
      setTextError(false)
    } else {
      setTextError(true)
    }
  }

  return (
    <Container maxWidth="sm" className="mt-10">
      <Title>Create New Schedule</Title>
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
            value={time}
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
            Create Schedule
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
          Create Schedule successfully!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default CreateSchedule
