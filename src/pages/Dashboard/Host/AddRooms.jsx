import { useState } from "react";
import AddRoomForm from "../../../components/Forms/AddRoomForm";

const AddRooms = () => {
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );
    const handelDates=(item)=>{
         setDates(item.selection)
         console.log(dates)
    }
    return (
        <div>
            <AddRoomForm handelDates={handelDates} dates={dates}></AddRoomForm>
        </div>
    );
};

export default AddRooms;