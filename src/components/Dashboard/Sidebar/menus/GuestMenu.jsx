import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useState } from 'react'
import toast from 'react-hot-toast'
import HostModal from '../../../Modal/HostModal'

const GuestMenu = () => {
  const [role]=useRole()
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [hostModal, setHostmodal] = useState(false)
  const closeModal = async () => {
    setHostmodal(false)
  }
  // host request 
  const handelRequestHost = async () => {
    const sendUserData = {
      email: user?.email,
      role: "guest",
      status: "requested"
    }
    try {
      const { data } = await axiosSecure.put("/user", sendUserData)
      if (data.modifiedCount > 0) {
        toast.success("Your Requst Success!")
      }
      else {
        toast.success("Your Requst Pending!")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setHostmodal(false)
    }
  }
  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

     {role==="guest" &&
       <div onClick={() => setHostmodal(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
       <GrUserAdmin className='w-5 h-5' />

       <span className='mx-4 font-medium'>Become A Host</span>
     </div>
     }
      <HostModal closeModal={closeModal} isOpen={hostModal} handelRequestHost={handelRequestHost}></HostModal>
    </>
  )
}

export default GuestMenu