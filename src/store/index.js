import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Tracks from './modules/Tracks'
import Playlists from './modules/Playlists'
import Albums from './modules/Albums'

export default new Vuex.Store({
	modules: { Tracks, Playlists, Albums }
})
