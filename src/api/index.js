import axios from 'axios'

export default {
  getBanner: (params) => axios.get('banner', params)
}
