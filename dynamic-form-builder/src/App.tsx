import './App.css'
import jsonData from '../data/test.json';
import FormBuilder from './components/FormBuilder';
import type { TForm } from './utils/types';
import { FormContextProvider } from './FormContext';

function App() {
   const formData: TForm = JSON.parse(JSON.stringify(jsonData));
   return (
      <FormContextProvider>
         <FormBuilder formData={formData} />
      </FormContextProvider>
   )
}

export default App
