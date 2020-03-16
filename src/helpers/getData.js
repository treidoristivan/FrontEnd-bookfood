import axios from 'axios'
import cookie from 'js-cookie'
function getData (dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {}
    if (cookie.get('ujang')) {
      console.log(cookie.get('ujang'))
      config.headers = { Authorization: `Bearer ${cookie.get('ujang')}` }
    }
    const url = process.env.REACT_APP_API_BASE_URL + dataUrl
    axios.get(url, config).then(result => {
      resolve(result)
    }).catch((e) => {
      reject(e)
    })
  })
}
export default getData
