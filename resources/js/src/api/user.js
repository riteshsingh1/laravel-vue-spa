import request from '@/utils/request'

/**
 * Get CSRF
 */
export function sanctum(){
    return request({
        url: '/sanctum/csrf-cookie',
        method: 'get'
    })
}

/**
 * Login User
 * @param data
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * Get User Info
 * @param token
 */
export function getInfo(token) {
  return request({
    url: '/api/user',
    method: 'get',
  })
}

/**
 * Logout User
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

/**
 * Register User
 * @param data
 */
export function registerUser(data){
    return request({
        url: '/register',
        method: 'post',
        data
    })
}

/**
 * Resend Email Verification
 */
export function resendVerification(){
    return request({
        url:'email/resend',
        method: 'post'
    })
}
