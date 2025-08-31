import {ref, deleteObject} from "firebase/storage"
import { storage } from "@/services/firebase.js"

export default async function deleteImage(imageURL) {
  if (imageURL === "" || imageURL == null) {return}
  const filePath = getFilePathFromUrl(imageURL)
  if (!filePath) throw new Error("Could not parse file path from URL");
  try {
    const fileRef = ref(storage, filePath)
    await deleteObject(fileRef)
  } catch (err){
    console.log(err)
  }
}

function getFilePathFromUrl(url) {
  try {
    // Grab the part between "/o/" and "?"
    const pathPart = url.match(/\/o\/(.*?)\?/)[1];
    // Firebase encodes slashes as %2F, so decode it
    return decodeURIComponent(pathPart);
  } catch (e) {
    console.error("Invalid Firebase Storage URL:", url);
    console.error(e);
    return null;
  }
}

