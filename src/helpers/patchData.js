import axios from 'axios'
import cookie from 'js-cookie'
function patchData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    if (cookie.get('ujang')) {
      config.headers = { Authorization: `Bearer ${cookie.get('ujang')}` }
    }
    const url = process.env.REACT_APP_API_URL + dataUrl
    axios.patch(url, dataForm, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default patchData
