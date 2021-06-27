import axios from 'axios'

export const GetMessages = ({ token, id }) =>
  axios.get(`http://localhost:9001/api/v1/message?userId=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
