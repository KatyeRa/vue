import axios from 'axios'
import Vue from 'vue'


const Tracks = {
	namespaced: true,

	state: () => ({
		activeItems: [],
		countOfActiveItems: 0,
	}),

	mutations: {
		setActiveItems(state, activeItems) {
			state.activeItems = activeItems
		},

		setCountOfActiveItems(state, countOfActiveItems) {
			state.countOfActiveItems = countOfActiveItems
		},
	},

	actions: {
		async fetchTracks({ commit, state }, payload) {
			try {
				const { offsetQuery, orderingQuery } = payload

				const res = await axios(
					`/api/track?limit=5&offset=${offsetQuery}&ordering=${orderingQuery}/`,
				)

				commit('setActiveItems', res.data.results)
				commit('setCountOfActiveItems', res.data.count)
			} catch (e) {
				Vue.toasted.show('Произошла какая-то ошибка, обратитесь к администратору', {
					className: 'error-notify',
					position: 'top-right',
					duration: 1000,
				})
				console.log(e)
			}
		},

		async createTrack({ commit, state }, payload) {
			try {
				await axios.post(
					'/api/track/',
					{
						...payload,
						is_visible: true,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				)

				Vue.toasted.show('Трек успешно добавлен', {
					className: 'success-notify',
					position: 'top-right',
					duration: 1000,
				})
			} catch (e) {
				Vue.toasted.show('Произошла какая-то ошибка, обратитесь к администратору', {
					className: 'error-notify',
					position: 'top-right',
					duration: 1000,
				})
				console.log(e)
			}
		},
	},

	getters: {
		getActiveItems: state => state.activeItems,
		getCountOfActiveItems: state => state.countOfActiveItems,
	},
}

export default Tracks
