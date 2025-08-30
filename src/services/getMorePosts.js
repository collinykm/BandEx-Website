import axios from "axios"

export default async function getMorePosts(skipNum, limit) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getMorePosts`, {
      params: {
        skip: skipNum,
        limit: limit
      }
    })
    return res.data
  } catch (err) {
    console.log(err);
  }
}
