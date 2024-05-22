import { useState } from "react";
import AddRoomForm from "../../../components/Forms/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../Api/utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AddRooms = () => {
    const { user } = useAuth()
    const [imagePreview, setImagePrivew] = useState()
    const [imageName, setImageName] = useState("")
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const naviget=useNavigate()
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );
    // handel post data room
    const { mutateAsync } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axiosSecure.post(`/room`, formData)
            return data
        },
        onSuccess: () => {
            toast.success("Successfully added Room")
            naviget('/dashboard/my-listings')
        }
    })
    // handel Preview data
    const handelPreviewInage = (image) => {
        setImagePrivew(URL.createObjectURL(image))
        setImageName(image.name)
    }
    // handel date Range
    const handelDates = (item) => {
        setDates(item.selection)

    }

    // handel form data
    const handelFormData = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const location = form.location.value
        const category = form.category.value
        const title = form.title.value
        const price = form.price.value
        const total_guest = form.total_guest.value
        const bedrooms = form.bedrooms.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const to = dates.endDate
        const from = dates.startDate
        const host = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
        }
        const image = form.image.files[0]

        try {
            const image_url = await uploadImage(image)
            const formData = { location, category, title, price, total_guest, bedrooms, bathrooms, description, to, from, host, image: image_url }
            await mutateAsync(formData)
            console.table(formData)
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            setLoading(true)
        }

    }
    return (
        <div>
            <AddRoomForm handelDates={handelDates} dates={dates} handelFormData={handelFormData} handelPreviewInage={handelPreviewInage} imagePreview={imagePreview} imageName={imageName} loading={loading}></AddRoomForm>
        </div>
    );
};

export default AddRooms;