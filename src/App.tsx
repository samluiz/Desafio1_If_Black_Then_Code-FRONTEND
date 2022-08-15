import { useState } from 'react'
import MyAppBar from './components/AppBar'
import CustomerForm from './components/CustomerForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <MyAppBar />
      <CustomerForm />
    </div>
    </>
  )
}

export default App
