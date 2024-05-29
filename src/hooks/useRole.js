import useAuth from "./useAuth";
import {useQuery} from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure";
const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    
    const { data: role = "",isLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled:!loading && !!user?.email,
        queryFn: async () => {
            if(user){
                const { data } = await axiosSecure(`/user/${user?.email}`)
                return data.role
            }else{
                return "guest"
            }
        }

    })
    return [role,isLoading]
};

export default useRole;