import axios from "axios"

export default async function updateAboutInfo(info) {
  try{
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/pages/updateAboutInfo`, info);
  } catch (error) {
    console.log(error)
  }
}
