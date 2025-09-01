import axios from "axios"

export default async function updateApplicationsInfo(info) {
  try{
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/pages/updateApplicationsInfo`, info)

  } catch (error) {
    console.log(error)
  }
}
