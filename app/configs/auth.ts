// ** url
import apiUrl from './url'

export default {
  meEndpoint: `${apiUrl.url}/users_app/user/`,
  loginEndpoint: `${apiUrl.url}/users_app/login/`,
  forgotPasswordEndpoint: `${apiUrl.url}/users_app/forgot-password/`,
  resetPasswordEndpoint: `${apiUrl.url}/users_app/reset-password/`,
  changePasswordEndpoint: `${apiUrl.url}/users_app/change-password/`,
  registerEndpoint: `${apiUrl.url}/users_app/register/`,
  storageTokenKeyName: 'accessToken'
}