import { createContext, useEffect, useState } from 'react'
import { jobsData } from '../assets/assets'
export const AppContext = createContext()

// Create the provider component
export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  })

  const [isSearched, setIsSearched] = useState(false)
  const [jobs,setJobs] = useState([])
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false) 

  // Function to fetch jobs
  const fetchJobs = async() => {
    setJobs(jobsData)
  }
  useEffect(()=>{
    fetchJobs(jobsData)
  },[])
  
    const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin, 
    }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}
