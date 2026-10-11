import axios from 'axios'

export const Api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') ||
      sessionStorage.getItem('adminToken') ||
      localStorage.getItem('usertoken') ||
      sessionStorage.getItem('usertoken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)

)

export const getUser = async () => {
  try {
    const res = await Api.get('/api/auth/profile')
    return res
  } catch (e) {
    console.error('error getting user details', e)
    throw e

  }

}



export const SignupMethod = async (data) => {
  try {
    const res = await Api.post('/api/auth/register', data)
    return res
  } catch (e) {
    throw e;
  }
}

export const LoginMethod = async (data) => {
  try {
    const res = await Api.post('/api/auth/login', data)
    return res
  } catch (e) {
    console.error('LoginMethod Error:', e)
    throw e
  }
}

export const sendOtp = async (email) => {
  try {
    const res = await Api.post('/api/auth/forgotpassword', email)
    return res
  } catch (e) {
    console.error('Error getting otp:', e)
    throw e
  }
}
export const verifyOtp = async (data) => {
  try {
    const res = await Api.post('/api/auth/otp-verify', data)
    return res
  } catch (e) {
    console.error('otp not verified:', e)
    throw e
  }
}
export const resetPassword = async (data) => {
  try {
    const res = await Api.post('/api/auth/changepassword', data)
    return res
  } catch (e) {
    console.error('Errot changing password', e)
    throw e
  }
}

export const UpdateProfile = async (data) => {
  try {
    const res = await Api.put('/api/auth/updateprofile', data)
    return res
  } catch (error) {
    console.error("error updating detaila")
    throw error
  }
}



// Admin apis

export const AdminSignupMethod = async (data) => {
  try {
    const res = await Api.post('/api/admin_auth/register', data)
    return res
  } catch (e) {
    console.error('AdminSignupMethod Error:', e)
    throw e
  }
}

export const AdminLoginMethod = async (data) => {
  try {
    const res = await Api.post('/api/admin_auth/login', data)
    return res
  } catch (e) {
    console.error('AdminLoginMethod Error:', e)
    throw e
  }
}

export const AdminsendOtp = async (email) => {
  try {
    const res = await Api.post('/api/admin_auth/forgot-password', email)
    return res
  } catch (e) {
    console.error('Error getting otp:', e)
    throw e
  }
}
export const AdminverifyOtp = async (data) => {
  try {
    const res = await Api.post('/api/admin_auth/otpverify', data)
    return res
  } catch (e) {
    console.error('otp not verified:', e)
    throw e
  }
}
export const AdminresetPassword = async (data) => {
  try {
    const res = await Api.post('/api/admin_auth/change-password', data)
    return res
  } catch (e) {
    console.error('Errot changing password', e)
    throw e
  }
}
// 
// products api

export const UpdateProduct = async (data, id) => {
  try {
    const res = await Api.put(`/api/products/update/${id}`, data)
    return res

  } catch (error) {
    console.error('Error updating product details', error)
    throw error
  }
}

export const PostMethod = async (data) => {
  try {
    const res = await Api.post('/api/products/add', data)
    return res
  } catch (e) {
    console.error('PostMethod Error:', e)
    throw e
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await Api.delete(`/api/products/delete/${id}`)
    return response

  } catch (error) {
    console.error('Error deleting product', error)
    throw error
  }
}

export const AddOrder = async (order) => {
  try {
    const res = await Api.post('/api/products/orders', order)
    return res
  } catch (error) {
    console.error('Error while placing Order:', error)
    throw error
  }

}