import axios from "axios"

export default async function getMentorshipDescriptions() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pages/getMentorshipInfo`);
    return res.data
  } catch (error) {
    console.log(error)
  }
}
