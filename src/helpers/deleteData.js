import axios from 'axios'
import cookie from 'js-cookie'
function deleteData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    if (cookie.get('ujang')) {
      config.headers = { Authorization: `Bearer ${cookie.get('ujang')}` }
    }
    const url = `http://localhost:1000${dataUrl}`
    axios.delete(url, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default deleteData
