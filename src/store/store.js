import Vue from 'vue'
import Vuex from 'vuex'
import { instance as http } from '@/utils/http'
Vue.use(Vuex)
//一个对象
let store = new Vuex.Store({
    state: {
        menu: [],
        group: [],
        table: []
    },
    mutations: { //通过commit来触发一个mutation
        updateMenu(state, data) {
            state.menu = data.data
        },
        updateGroup(state, payload) {
            state.group = payload
        },
        updateTable(state, payload) {
            state.table = payload
        },
        deleteItem(state, payload,cb) {
            let tmp = [...state.table];
            let ids;
            tmp.forEach((item, index) => {
                if (item.code == payload.code) {
                    ids = index
                }
            })
            tmp.splice(ids, 1)
            state.table = tmp;
            payload.cb()
            //console.log(state.payload)
        }
    },
    actions: { //通过dispath来触发一个action
        fetchMenu({ commit }) {
            http.get('/static/server/data.json')
                .then(res => {
                    //console.log(res)
                    //this.menu=res.data
                    setTimeout(() => {
                        commit('updateMenu', res)
                    }, 1000)
                })
        },
        fetchGroup({ commit, state }, cb) {
            if (state.group.length > 0) {
                cb()
            }
            http.get('/static/server/group.json')
                .then(res => {
                    setTimeout(() => {
                        //console.log(res.data)
                        store.commit('updateGroup', res.data)
                        cb()
                    }, 2000)
                })
        },
        fetchTable({ commit, state }, payload) {
            http.get('/static/server/user.json').then(res => {
                //console.log(res)
                commit('updateTable', res.userList)
                payload()
            })
        },
        deleteItem({ commit }, payload) {
            commit('deleteItem', payload)
        }
    },
    getters: {
        filterGroup(state) {
            //console.log(state)
            return (filter) => {
                if (filter) {
                    let res = state.group.filter((item) => {
                        return item.groupName.indexOf(filter) > 1 || item.upperGroup.indexOf(filter) > 1
                    })
                    return res
                } else {
                    return state.group
                }
            }
        }
    },
    modules: {}
})
//console.log(store)
export default store