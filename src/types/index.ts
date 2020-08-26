export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/**
 * @export
 * @interface AxiosRequestConfig
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 指定返回数据类型
  timeout?: number // 请求超时时间
}
/**
 *
 * @export
 * @interface AxiosResponseConfig
 */
export interface AxiosResponseConfig {
  data: any // 响应数据
  status: number // 响应状态码
  statusText: string // 响应文本
  headers: any // 响应头
  config: AxiosRequestConfig
  request: any // 请求实例
}

export interface AxiosPromise extends Promise<AxiosResponseConfig> {}

export interface AxiosError {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response: AxiosResponseConfig
}

export interface Axios {
  // 描述Axios类中的公共方法
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  // 实例去继承上面的属性
  (config: AxiosRequestConfig): AxiosResponseConfig
}
