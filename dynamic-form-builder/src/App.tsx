import './App.css'
import jsonData from '../data/test.json';
import FormBuilder from './components/FormBuilder';
import type { TForm } from './utils/types';
import { FormDataProvider } from './FormContext';
import { PrevFormDataProvider } from './PrevFormContext';

function App() {
   const formData: TForm = JSON.parse(JSON.stringify(jsonData));
   return (
      <FormDataProvider>
         <PrevFormDataProvider>
            <FormBuilder formData={formData} />
         </PrevFormDataProvider>
      </FormDataProvider>
   )
}

export default App
