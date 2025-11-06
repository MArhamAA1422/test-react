import './App.css'
import jsonData from '../data/test.json';
import FormBuilder from './components/FormBuilder';
import type { TForm } from './utils/types';
import { FormDataProvider } from './FormContext';

function App() {
   const formData: TForm = JSON.parse(JSON.stringify(jsonData));
   return (
      <FormDataProvider>
         <FormBuilder formData={formData} />
      </FormDataProvider>
   )
}

export default App
