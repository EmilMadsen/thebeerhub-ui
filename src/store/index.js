import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

axios.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = localStorage.getItem('brewtoken')
    return config
}) 

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('brewtoken') || '',
        brews: [],
        selectedId: null,
    },
    mutations: {
        // sync

        setToken(state, payload) {
            state.token = payload;
        },
        logout(state) {
            localStorage.removeItem('brewtoken')
            state.token = '';
        },
        setBrews(state, payload) {
            state.brews = payload;
        },
        updateBrew(state, payload) {
            const brew = state.brews.find(brew => brew.id == payload.id);
            if (brew) {
                Object.assign(brew, payload);
            } else {
                state.brews.push(payload);
            }
        },
        setSelectedId(state, payload) {
            state.selectedId = payload;
        }
    },
    actions: {
        // async

        login(state, payload) {
            axios.post(process.env.VUE_APP_API_BREW + '/login', payload)
                .then((response) => {
                    if (response.status === 200) {
                        // update token
                        localStorage.setItem('brewtoken', response.headers.token)
                        state.commit("setToken", response.headers.token)
                        axios.interceptors.request.use((config) => {
                            config.headers.common['Authorization'] = response.headers.token
                            return config
                        })    
                        alert("success")
                    } else {
                        alert(response)
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        loadBrews(state) {
            axios.get(process.env.VUE_APP_API_BREW + "/brew")
                .then((response) => {
                    state.commit('setBrews', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        loadBrew(state, payload) {
            axios.get(process.env.VUE_APP_API_BREW + "/brew/" + payload)
                .then((response) => {
                    state.commit('updateBrew', response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        saveBrew(state, payload) {
            axios.post(process.env.VUE_APP_API_BREW + '/brew/', payload)
                .then((response) => {
                    console.log(response);
                    state.commit('updateBrew', response.data);
                    if (response.status === 201) {
                        router.push({path: '/details/' + response.data.id})
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        deleteBrew(state, payload) {
            axios.delete(process.env.VUE_APP_API_BREW + '/brew/' + payload)
                .then(response => {
                    console.log(response)
                    this.dispatch("loadBrews")
                    router.push({path: '/home'})
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // load tiltlog

        nextBrewStep(state, payload) {
            axios.post(process.env.VUE_APP_API_BREW + "/step/parent/" + this.state.selectedId + '/next/' + payload)
                .then((response) => {
                    console.log(response);
                    this.dispatch("loadBrew", this.state.selectedId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },
    modules: {},
    getters: {
        getIsAuthenticated(state) {
            return Boolean(state.token);
        },
        getToken: state => state.token,
        getBrews: state => state.brews,
        getSelectedBrew: state => {
            return state.brews.find(
                brew => brew.id = state.selectedId
            );
        }
    }
});