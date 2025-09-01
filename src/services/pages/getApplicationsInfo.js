import axios from "axios"

export default async function getApplicationsInfo() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pages/getApplicationsInfo`);
    return res.data
  } catch (error) {
    console.log(error)
  }
}
