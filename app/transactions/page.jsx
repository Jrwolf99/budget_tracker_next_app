"use client"
import React from 'react'
import AllTransactions from './components/alltransactions'
import UploadCSVBox from './components/upload'

export default function TransactionsPage() {
 
 
  return (
    <div className='flex flex-col gap-4'>
      <UploadCSVBox />
      <AllTransactions />
    </div>
  )
}
