import { useState } from "react";
import AddRoomForm from "../../../components/Forms/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { uploadImage } from "../../../Api/utils";


const AddRooms = () => {
    const { user } = useAuth()
    const [imagePreview,setImagePrivew]=useState()
    const [imageName,setImageName]=useState("")
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );
    const handelPreviewInage=(image)=>{
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
            console.table(formData)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <AddRoomForm handelDates={handelDates} dates={dates} handelFormData={handelFormData} handelPreviewInage={handelPreviewInage} imagePreview={imagePreview} imageName={imageName}></AddRoomForm>
        </div>
    );
};

export default AddRooms;