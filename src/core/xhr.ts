import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from '../types'
import { parseHeader } from '../helpers/header'
import { transformResponse } from '../helpers/data'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest() // build request object
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, true) // build request connection

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      let { status, statusText } = request
      const responseHeaders = parseHeader(request.getAllResponseHeaders()) // 获取相应头部
      // 判断从哪里取数据
      const responseData = responseType !== 'text' ? request.response : request.responseText
      console.log(request)

      const response: AxiosResponseConfig = {
        data: transformResponse(responseData),
        status: status,
        statusText: statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, null, request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data) // send data

    function handleResponse(response: AxiosResponseConfig) {
      // 判断状态码
      let { status } = response
      if ((status >= 200 && status < 300) || status === 304) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
