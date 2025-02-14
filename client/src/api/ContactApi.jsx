import axios from "axios";
const APIUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: APIUrl
})

export const getContact = () => {
  return  api.get("/users")
}


export const addContact = (formData) => {
    return api.post("/users", formData)
}


export const editContact = (id, formData) => {
    return api.put(`/users/${id}`,formData)
}


export const deleteContact =(id) => {
    return api.delete(`/users/${id}`)
}