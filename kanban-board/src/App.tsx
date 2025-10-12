import './App.css'
import Todo from './components/Todo'
import InProgress from './components/InProgress'
import Testing from './components/Testing'
import Finished from './components/Finished'

function App() {

  return (
    <>
      <Todo />
      <InProgress />
      <Testing />
      <Finished />
    </>
  )
}

export default App
