import axios from 'axios'
export default async function newPost(postData) {
  try {
    console.log("within newPost.js postData ", postData)
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/newPost`, postData)
  } catch (error) {
    console.log(error)
  }

}
