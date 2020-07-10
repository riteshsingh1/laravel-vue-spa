import request from '@/utils/request'

export function sanctum(){
    return request({
        url: '/sanctum/csrf-cookie',
        method: 'get'
    })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
