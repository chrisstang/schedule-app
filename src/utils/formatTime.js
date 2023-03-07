const formatTime = (datetime) => {
  const dateObj = new Date(datetime)
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  const formattedTime = `${hours}:${minutes}`
  return formattedTime
}

export default formatTime
