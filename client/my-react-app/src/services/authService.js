import axiosPrivate from './api'

export const SignUp = (userData) => axiosPrivate.post('/register', userData)