import axios from "axios"

export default async function deletePost(id) {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deletePost/${id}`);
}
