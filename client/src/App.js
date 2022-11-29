import React from 'react'
import {DataProvider} from "./GobalState"
import Header from "./components/headers/Header"
import Page from "./components/mainpage/Page"
const App = () =>{
  return (
    <DataProvider>
        <div className = "App" >
          <Header/>
          <Page/>
        </div>
    </DataProvider>
  )
}
export default App


