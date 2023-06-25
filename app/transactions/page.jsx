"use client"
import React from 'react'
import useGet from '../utility_hooks/useGet'

export default function TransactionsPage() {
 
  const {data} = useGet('/transactions')
 
  return (
    <div>logging the data! {console.log("here is the data: ", data)}</div>
  )
}
