import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
const CategoryBox = ({ label, icon: Icon }) => {
  const naviget =useNavigate()
  const handelQuery = () => {
    const currentQuery = { category: label }
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    });
    naviget(url)
  }

  return (
    <div
      onClick={handelQuery}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
