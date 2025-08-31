import axios from "axios"

export default async function getPhotoCards(skipNum = 0, limit = 3) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/photos/getPhotoCards`, {
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
