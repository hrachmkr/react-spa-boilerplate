/* @flow */
import { objToQs } from '../helpers'

class ApiFactory<T, P> {
  apiCall: string

  constructor(params?: ApiFactoryClassParams) {
    if (params) {
      const { path } = params
      this.apiCall = path
    }
  }

  setApiCall(path: string) {
    this.apiCall = path
  }

  apiFetcher<T>(
    params: IFetch,
    options?: Object = {
      credentials: 'include',
    }
  ): Promise<T> {
    return fetch(params, options).then((res) => ((res.json(): any): T))
  }

  _getByURL(url: string): Promise<T> {
    return this.apiFetcher(url)
      .then(this.successHandler)
      .catch(this.errorHandler)
  }

  /**
   * @param {string} params query string key value pairs.
   */
  get(params?: ApiFactoryParams): Promise<T> {
    const queryString = params ? objToQs(params) : ''
    return this._getByURL(`${this.apiCall}${queryString}`)
  }

  /**
   * @param {*} param URL path parameters.
   */
  getWithParam(param: string | number): Promise<T> {
    return this._getByURL(`${this.apiCall}/${param}`)
  }

  post(body: P) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(body),
    }

    return this.apiFetcher(`${this.apiCall}`, options)
      .then(this.successHandler)
      .catch(this.errorHandler)
  }

  /**
   *
   * @param {Object} body
   * @param {number | string} param
   * @description Patch request which receives an object as its body and
   * params as its query parameters.
   */
  patch(body: P, param?: number | string) {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(body),
    }

    return this.apiFetcher(
      `${this.apiCall}${param ? `/${param}` : ''}`,
      options
    )
      .then(this.successHandler)
      .catch(this.errorHandler)
  }

  /**
   *
   * @param {number} params
   * @description Delete method which receives `params` and set a call to api.
   */
  delete(params: number | string) {
    const options = {
      method: 'DELETE',
      credentials: 'include',
    }

    return this.apiFetcher(`${this.apiCall}/${params}`, options)
      .then(this.successHandler)
      .catch(this.errorHandler)
  }

  successHandler(response: IAPIResponse<T>): T {
    const { data, status, message } = response
    if (status >= 400) {
      throw new Error(`API call failed. ${message}`)
    }

    return data
  }

  errorHandler(error: Error | string) {
    throw new Error(
      `Something went wrong. ${error instanceof Error ? error.message : error}`
    )
  }
}

export default ApiFactory
