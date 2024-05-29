import PropTypes from 'prop-types'
import UpdateUserModal from '../../../components/Modal/UpdateUserModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from "react-hot-toast"
const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const { mutateAsync } = useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosSecure.patch(`/user/update/${user?.email}`, userInfo)
      return data
    },
    onSuccess: (data) => {
      if(data.modifiedCount>0){
        toast.success("Approve Role success")
      }
    }
  })
  const modalHandler = async (selectedRole) => {
    console.log(selectedRole)
    if(user?.role==="admin"){
      return toast.error("Addmin Role Not Changed")
    }
    const userInfo = { role: selectedRole,status:"verified" }
    try {
      await mutateAsync(userInfo)
      refetch()
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
              } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal modalHandler={modalHandler} isOpen={isOpen} setIsOpen={setIsOpen} user={user}></UpdateUserModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow