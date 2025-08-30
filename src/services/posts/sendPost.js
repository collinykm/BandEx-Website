import axios from 'axios'
export async function newPost(postData) {
  try {
    console.log("within sendPost.js newPost ", postData)
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/newPost`, postData)
  } catch (error) {
    console.log(error)
  }
}

export async function editPost(postData) {
  try {
    console.log("within sendPost.js editPost ", postData)
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/posts/editPost`, postData)
  } catch (error) {
    console.log(error)
  }
}
