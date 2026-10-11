import React, { useState } from 'react'
// import { resetPassword, sendOtp, verifyOtp } from '../../contex/Api'
import { resetPassword,sendOtp, verifyOtp } from '../contex/Api'
import { useNavigate } from 'react-router-dom'

const Forgot_Password = () => {
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState('Send OTP')
  const [otpStatus, setOtpStatus] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [emailStatus, setEmailStatus] = useState(false)
  const [confirmPassword,setConfirmPassword]=useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }





  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!emailStatus) {
        // setIsLoading('Sending... OTP')
        const response = await sendOtp(formData)

        if (response.status !== 200) {
          setIsLoading('Send OTP')
          return setError('provide valid email')
        }
        setIsLoading("OTP Sent")
        setEmailStatus(true)
       
      }
      if (!isVerified) {
        const response = await verifyOtp(formData)
        if (response.status !== 200) {
          return setError(response.data?.message || 'invalid otp')
        }

        setIsVerified(true)
       
      }

      if(formData.password !== confirmPassword ){
        return setError('Passwords do not match')
      }
      const response = await resetPassword(formData)
       if (response.status !== 200) {
          return setError(response.data?.message || 'failed to reset password')
        }

      alert("Password changed successfully")

      setIsLoading("Send OTP")
      setIsVerified(false)
      setEmailStatus(false)
      setFormData({
        email: '',
        otp: '',
        password: '',
      })
      navigate('/login');

    } catch (e) {
      console.log(e)
      setError(e.response?.data?.message || e.message ||'An error occurred')
    }
  }

  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center '>
      <div className='min-h-70 w-100 flex flex-col gap-7 items-center p-5 bg-slate-800'>
        <h2 className='text-2xl font-bold text-white tracking-wide'>FORGOT PASSWORD</h2>
        {error && (
          <div className='w-full bg-red-500/10 border border-red-500/50 text-red-400 p-2.5 rounded-lg text-sm text-center'>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className='w-full p-5 flex flex-col gap-7 justify-center h-full ' >

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 pl-2">
              Email Address
            </label>
            <input
              id='email'
              className='w-full pl-3 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors'
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              placeholder='admin@company.com' />

          </div>
          <button
            className='w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/25'
            type="submit"
            disabled={isLoading === "OTP Sent"}
          >
            {isLoading}
          </button>

          {/*verify otp */}

          {emailStatus && (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-300 mb-1.5 pl-2">
                  OTP
                </label>

                <input
                  id='otp'
                  className='w-full pl-3 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors'
                  type="text"
                  name="otp"
                  onChange={handleChange}
                  value={formData.otp}
                  required
                  placeholder='e.g, 123456' />

              </div>
              <button
                className='w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/25'
                type="submit"
                disabled={isVerified}
              >
                {isVerified ? 'Verified' : 'Verify OTP'}
              </button>
            </>
          )}

          {/* reset password */}

          {isVerified && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5 pl-2">
                  Password
                </label>

                <input
                  id='password'
                  className='w-full pl-3 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  placeholder='e.g, yfg456' />
              </div>
              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-slate-300 mb-1.5 pl-2">
                  Conform Password
                </label>
                <input
                  id='confirmpassword'
                  className='w-full pl-3 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors'
                  type="password"
                  name="confirmpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  placeholder='e.g, yfg456' />

              </div>
              <button
                className='w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-medium rounded-lg text-sm transition-colors shadow-lg shadow-indigo-600/25'
                type="submit"
              >
                Change Password
              </button>
            </>
          )}
        </form>
      </div>

    </div>
  )
}

export default Forgot_Password