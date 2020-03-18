import axios from 'axios'
import cookie from 'js-cookie'
function submitData (dataUrl, dataForm) {
  const config = {}
  if (cookie.get('ujang')) {
    config.headers = { Authorization: `Bearer ${cookie.get('ujang')}` }
  }
  return new Promise((resolve, reject) => {
    const url = process.env.REACT_APP_API_BASE_URL + dataUrl
    axios.post(url, dataForm,config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default submitData
