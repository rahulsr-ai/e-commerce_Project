"use client"


import {useContext, createContext} from 'react'
import { useState } from 'react'


const HandleSidebarContext = createContext()

const SidebarProvider = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <HandleSidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>
      {children}
    </HandleSidebarContext.Provider>
  )
}

const useSidebar = () => useContext(HandleSidebarContext)
export {useSidebar, SidebarProvider}