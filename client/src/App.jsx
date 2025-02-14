import Contact from "./components/Contact"
import InputForm from "./components/InputForm"
import { useState } from "react"
function App() {
  const [data, setdata] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: ""
})

const [updateFormData, setUpdateFormData] = useState({

})



  return (
    <>
       
      <InputForm  setdata={setdata} formData={formData} setFormData={setFormData} updateFormData={updateFormData} />

      <Contact data={data}  setdata={setdata}  setUpdateFormData={setUpdateFormData} />
    </>
  )
}

export default App
