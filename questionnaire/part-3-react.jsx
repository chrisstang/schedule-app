// Part 3: React

// Question 1
// Create a React component that displays a list of items retrieved from an API endpoint.
import React, { useState, useEffect } from 'react'

export default function ItemList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
  }, [])

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

// Question 2
// Write a React function that takes a number as input and returns a list of that length, with each item consisting of a random number between 1 and 100.
import React, { useState, useEffect } from 'react'

export default function RandomNumberList({ length }) {
  const [numbers, setNumbers] = useState([])

  useEffect(() => {
    const randomNumbers = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1)
    setNumbers(randomNumbers)
  }, [length])

  return (
    <ul>
      {numbers.map((number, index) => (
        <li key={index}>{number}</li>
      ))}
    </ul>
  )
}

