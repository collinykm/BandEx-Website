import axios from 'axios'

export default async function getPosts() {
  try {
    let posts = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getPosts`);
    return posts;
  } catch (error) {
    console.log(error)
  }


}
