import { AxiosInstance } from './types'
import Axios from './core/axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  let context = new Axios()
  let instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  console.log(instance)
  return instance as AxiosInstance
}

let axios = createInstance()
export default axios
