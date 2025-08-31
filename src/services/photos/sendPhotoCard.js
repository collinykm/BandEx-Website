import axios from "axios"

export async function newCard(cardData) {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/photos/newPhotoCard`, cardData)
  } catch (error) {
    console.log(error)
  }
}

export async function editCard(cardData) {
  try {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/photos/editPhotoCard`, cardData)
  } catch (error) {
    console.log(error)
  }
}
