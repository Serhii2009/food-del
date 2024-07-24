import { useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      })
      if (response.data.success) {
        navigate('/myorders')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Payment verification failed', error)
      navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
