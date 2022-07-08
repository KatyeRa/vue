<template>
	<div class="grey lighten-3">
		<v-data-table
			:headers="headers"
			:items="getActiveItems"
			:options.sync="options"
			:server-items-length="getCountOfActiveItems"
			:loading="loading"
			class="elevation-1"
			:footer-props="{
				'items-per-page-options': [5],
			}"
			:items-per-page="5"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Треки</v-toolbar-title>
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
				{ text: 'Обложка', value: 'image', width: '40px', sortable: false },
				{
					text: 'Название трека',
					align: 'start',
					sortable: true,
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

			await this.$store.dispatch('Tracks/fetchTracks', payload)

			this.loading = false
		},
	},

	computed: {
		...mapGetters({
			getActiveItems: 'Tracks/getActiveItems',
			getCountOfActiveItems: 'Tracks/getCountOfActiveItems',
		}),
	},
}
</script>

<style>
.v-data-footer {
  justify-content: flex-end;
  padding: 5px 0 !important;
}
</style>