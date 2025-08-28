import axios from 'axios'

export default async function getPosts(recent = true) {
  try {
    if (recent) {
      const res =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getRecentPosts`);
      return res.data
    } else {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllPosts`);
      return res.data
    }
  } catch (error) {
    console.log(error)
  }


}
