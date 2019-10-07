import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const state = () => ({
	counter: 0,
	seconds: 0,
	minutes: 0
})
export const getters = {
	counter: state => {
		return state.counter
	},
	seconds: state => {
		return state.seconds
	},
	minutes: state => {
		return state.minutes
	}
}

export const mutations = {
	setCounter(state, payload){
		state.counter = payload
	},
	setSeconds(state, payload){
		state.seconds = payload
	},
	setMinutes(state, payload){
		state.minutes = payload
	}
}

export const actions = {
	setCounter(context, payload) {
		context.commit('setCounter', payload)
	},
	setSeconds(context, payload) {
		context.commit('setSeconds', payload)
	},
	setMinutes(context, payload) {
		context.commit('setMinutes', payload)
	}
}