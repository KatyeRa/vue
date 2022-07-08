<template>
	<div class="home">
		<v-data-table
			:headers="headers"
			:items="getActiveItems"
			:options.sync="options"
			:server-items-length="getCountOfActiveItems"
			:loading="loading"
			class="elevation-1"
			:footer-props="{
				'items-per-page-options': [5, -1],
				'items-per-page-all-text': 'Показать все',
			}"
			:items-per-page="5"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Альбомы</v-toolbar-title>
				</v-toolbar>
			</template>

			<template v-slot:item.image="{ item }">
				<div class="d-flex align-items justify-center pa-1">
					<v-img width="40" :src="item.image" alt="" />
				</div>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',

	data() {
		return {
			totalDesserts: 0,
			desserts: [],
			loading: true,
			options: {},
			headers: [
				{
					text: 'Название плейлиста',
					align: 'start',
					value: 'name',
				},
				{ text: 'Описание', value: 'description', sortable: false },
			],
		}
	},
	watch: {
		options: {
			handler() {
				this.getDataFromApi()
			},
			deep: true,
		},
	},
	methods: {
		async getDataFromApi() {
			this.loading = true

			const { sortBy, sortDesc, page, itemsPerPage } = this.options

			const prefixDirectionSort = sortDesc[0] ? '' : '-'

			const payload = {
				offsetQuery: (page - 1) * 5,
				orderingQuery: prefixDirectionSort + sortBy,
			}

			await this.$store.dispatch('Albums/fetchAlbums', payload)
			this.loading = false
		},
	},

	computed: {
		...mapGetters({
			getActiveItems: 'Albums/getActiveItems', 
			getCountOfActiveItems: 'Albums/getCountOfActiveItems'
		}),
	},
}
</script>
