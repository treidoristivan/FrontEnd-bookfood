import axios from 'axios'
import storage from '../store'

function deleteData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    const token = storage.store.getState().dataUser.token
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }
    const url = process.env.REACT_APP_API_BASE_URL + dataUrl
    axios.delete(url, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default deleteData
