import axios from 'axios'

export default async function getPosts() {
  try {
    const res =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getRecentPosts`);
    return res.data
  } catch (error) {
    console.log(error)
  }


}
