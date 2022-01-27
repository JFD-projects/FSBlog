import { useState, useEffect } from 'react'
import articles from '../api/mockData/articles.json'
import mainInfo from '../api/mockData/mainInfo.json'
import httpService from '../services/http.service'

export const useMockData = () => {
  const statusConst = {
    idle: 'Not Started',
    pending: 'In Process',
    successed: 'Ready',
    error: 'Error occured'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount = articles.length + mainInfo.length

  const incrementCount = () => {
    setCount(prevState => prevState + 1)
  }

  const updateprogress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConst.successed)
    }
  }

  useEffect(() => {
    updateprogress()
  }, [count])

  async function initialize () {
    try {
      for (const blog of articles) {
        await httpService.put('articles/' + blog.id, blog)
        incrementCount()
      }
      for (const main of mainInfo) {
        await httpService.put('mainInfo/' + main.id, main)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConst.error)
    }
  }
  return { error, initialize, progress, status }
}