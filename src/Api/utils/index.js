import axios from "axios"

export const uploadImage = async (image) => {
    const fromData = new FormData()
    fromData.append("image", image)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_URL}`, fromData)
    return data.data.display_url
}