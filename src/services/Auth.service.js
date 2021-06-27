import axios from 'axios'

export const LoginUser = (value) =>
  axios.post('http://localhost:9001/api/v1/auth/login', value)

export const RegisterUser = (value) =>
  axios.post('http://localhost:9001/api/v1/auth/register', value)
