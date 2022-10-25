import React, { useState } from "react";
import Header from "./components/Header"

import Amplify from 'aws-amplify'
import AwsConfig from './aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
Amplify.configure(AwsConfig)


const App = ({ children }) => {
  return (
    <Authenticator.Provider>
      <div className="bg-slate-200 min-h-screen overflow-x-hidden">
        <Header />
        <div className="max-w-7xl mx-auto mt-5">
          {children}
        </div>
      </div>
    </Authenticator.Provider>
  )
}
export default App;