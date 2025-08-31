import axios from "axios"

export default async function deletePhotoCard(id) {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/photos/deletePhotoCard/${id}`);
  } catch (error) {
    console.error(error);
  }


}
