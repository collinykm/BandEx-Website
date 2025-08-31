import axios from "axios"

export default async function updateMentorshipDescription(description) {
  try{
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/pages/updateMentorshipDescription`,  description);
  } catch (error) {
    console.log(error)
  }
}
