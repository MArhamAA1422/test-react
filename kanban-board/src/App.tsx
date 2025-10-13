import './App.css'
import './assets/tailwind.css'
import Todo from './components/Todo'
import InProgress from './components/InProgress'
import Testing from './components/Testing'
import Finished from './components/Finished'
import UserInfo from './components/UserInfo'

function App() {
  console.log("App Rendered");
  return (
    <>
      <UserInfo />
      <Todo />
      <InProgress />
      <Testing />
      <Finished />
    </>
  )
}

export default App
