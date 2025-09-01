import axios from "axios"

export default async function getAboutInfo() {
  try{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pages/getAboutInfo`);
    return res.data
  } catch (error) {
    console.log(error)
  }
}
