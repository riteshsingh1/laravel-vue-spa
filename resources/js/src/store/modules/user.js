import {login, logout, getInfo, sanctum, registerUser} from '../../api/user'
import {getToken, setToken, removeToken} from '../../utils/auth'
import {resetRouter} from '@/router'
import {MessageBox, Message} from 'element-ui'


const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        email: '',
        verified: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_EMAIL: (state, email)=>{
        state.email = email;
    },
    SET_VERIFIED: (state, verified)=>{
        state.verified = verified;
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            sanctum().then(() => {
                login({email: username.trim(), password: password}).then(response => {
                    commit('SET_TOKEN', 1)
                    setToken('1')
                    resolve()
                }).catch(error => {
                    Message({
                        message: "Incorrect email or password",
                        type: 'error',
                        duration: 5 * 1000
                    })
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        })
    },
    // register
    register({commit}, data) {
        return new Promise((resolve, reject)=>{
            registerUser(data).then(response => {
                const { data } = response;
                const { name,email,verified } = data;
                commit("SET_EMAIL", email);
                commit("SET_NAME", name);
                commit("SET_VERIFIED", verified);
                resolve(data);
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {data} = response
                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                const { name,email,verified } = data;
                commit("SET_EMAIL", email);
                commit("SET_NAME", name);
                commit("SET_VERIFIED", verified);
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

