import './App.css'
import './assets/tailwind.css'
import Section from './components/Section';
import UserInfo from './components/UserInfo';

function App() {
  console.log("App Rendered");

  return (
    <>
      <UserInfo />
      <div className="flex flex-row gap-1">
        <Section section={'todo'} />
        <Section section={'inprogress'} />
        <Section section={'testing'} />
        <Section section={'finished'} />
      </div>
    </>
  )
}

export default App
