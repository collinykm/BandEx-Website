import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression"
import {storage} from "@/services/firebase.js"

export default async function uploadFile(image) {
  const allowedFileTypes = ["image/png", "image/jpeg"];
  if (!allowedFileTypes.includes(image.type)) {
    throw new Error("Invalid image type");
  }

  const newImageName = `${Date.now()}-${image.name}`;
  console.log(`worked till here, here's new image name: ${newImageName}`);
  const storageRef = ref(storage, newImageName)

  const compressedImg = await imageCompression(image, {maxSizeMB: 1})
  await uploadBytes(storageRef, compressedImg)
  console.log("image uploaded")
  const url = await getDownloadURL(storageRef)
  console.log("url", url)
  return url
}
