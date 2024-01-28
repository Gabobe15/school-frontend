// ** url
import apiUrl from './url'

export default {
  meEndpoint: `${apiUrl.url}/users/users/`,
  loginEndpoint: `${apiUrl.url}/users/login/`,
  forgotPasswordEndpoint: `${apiUrl.url}/users/forgot-password/`,
  resetPasswordEndpoint: `${apiUrl.url}/users/reset-password/`,
  changePasswordEndpoint: `${apiUrl.url}/users/change-password/`,
  registerEndpoint: `${apiUrl.url}/users/register/`,
  registerStudent: `${apiUrl.url}/mkuapi/register/`,
  storageTokenKeyName: 'accessToken'
}