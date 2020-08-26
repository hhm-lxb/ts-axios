import { AxiosRequestConfig, AxiosResponseConfig } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponseConfig
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponseConfig
  ) {
    super(message)
    this.config = config
    this.isAxiosError = true
    this.request = request
    this.response = response
    this.code = code
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
