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
        loading: true,
        token: localStorage.getItem('brewtoken') || '',
        brews: [],
        selectedId: null,
        snackbar: {
            text: '',
            color: ''
        },
    },
    mutations: {
        // sync

        setLoading(state, payload) {
            state.loading = payload;
        },
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
        },
        addLogs(state, logs) {
            const brew = state.brews.find(brew => brew.id == state.selectedId);
            Vue.set(brew, 'tiltLogs', logs)
        },

        showSnackbar (state, payload) {
            state.snackbar.text = payload.text
            state.snackbar.color = payload.color
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
                        state.commit('showSnackbar', { text: 'Sucessfully logged in', color: 'green' })
                        router.push({path: '/home'})
                    } else {
                        state.commit('showSnackbar', { text: response, color: 'red' })
                    }
                })
                .catch((error) => {
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

        loadBrews(state) {
            state.commit('setLoading', true)
            axios.get(process.env.VUE_APP_API_BREW + "/brew")
                .then((response) => {
                    state.commit('setBrews', response.data);
                    state.commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                    state.commit('setLoading', false)
                });
        },

        loadBrew(state, brewId) {
            axios.get(process.env.VUE_APP_API_BREW + "/brew/" + brewId)
                .then((response) => {
                    state.commit('updateBrew', response.data);
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

        saveBrew(state, payload) {
            axios.post(process.env.VUE_APP_API_BREW + '/brew/', payload)
                .then((response) => {
                    state.commit('updateBrew', response.data);
                    state.commit('showSnackbar', { text: "Successfully saved brew: " + payload.brewName, color: 'green' })
                    if (response.status === 201) {
                        this.dispatch('loadBrew', response.data.id)
                        router.push({path: '/details/' + response.data.id})
                    }
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

        deleteBrew(state, brewId) {
            axios.delete(process.env.VUE_APP_API_BREW + '/brew/' + brewId)
                .then(response => {
                    this.dispatch("loadBrews")
                    state.commit('showSnackbar', { text: 'Successfully deleted brew', color: 'warning' })
                    router.push({path: '/home'})
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

        loadTiltLog(state, brewId) {
            axios.get(process.env.VUE_APP_API_BREW + "/brew/" + brewId + '/tilt-logs')
                .then((response) => {
                    state.commit('addLogs', response.data);
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

        nextBrewStep(state, timestamp) {
            axios.post(process.env.VUE_APP_API_BREW + "/step/parent/" + this.state.selectedId + '/next/' + timestamp)
                .then((response) => {
                    this.dispatch("loadBrew", this.state.selectedId);
                })
                .catch((error) => {
                    console.log(error);
                    state.commit('showSnackbar', { text: error, color: 'red' })
                });
        },

    },
    modules: {},
    getters: {
        getIsLoading(state) {
            return state.loading;
        },
        getIsAuthenticated(state) {
            return Boolean(state.token);
        },
        getToken: state => state.token,
        getBrews: state => state.brews,
        getSelectedBrew: state => {
            return state.brews.find(
                brew => brew.id == state.selectedId
            );
        },

        getSnackbar: state => state.snackbar,
    }
});