<template>
	<v-app id="inspire">
		<v-app-bar app color="white" flat>
			<v-container class="py-0 fill-height">
				<v-avatar class="mr-5" color="grey darken-1" size="32"><v-img :src="require(`@/assets/logo.jpg`)"></v-img></v-avatar>
				<strong class="mr-10">Екатерина Ракитова</strong>

				<v-spacer></v-spacer>

				<v-btn href="https://github.com/KatyeRa/Django" target="_blank" text
					>GitHub</v-btn
				>
			</v-container>
		</v-app-bar>

		<v-main class="grey lighten-3">
			<v-container>
				<v-row>
					<v-col cols="2">
						<v-sheet rounded="lg">
							<v-list color="transparent">
								<v-list-item link to="/tracks">
									<v-list-item-content>
										<v-list-item-title>Треки</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link to="/playlists">
									<v-list-item-content>
										<v-list-item-title>Плейлисты</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item link to="/albums">
									<v-list-item-content>
										<v-list-item-title>Альбомы</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link>
									<v-list-item-content>
										<v-list-item-title
											class="d-flex align-center"
											@click="dialog = true"
										>
											<v-icon class="mr-2">mdi-plus</v-icon>Добавить трек
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-col>

					<v-col>
						<v-sheet rounded="lg">
							<router-view />
						</v-sheet>
					</v-col>
				</v-row>

				<v-dialog
					transition="dialog-bottom-transition"
					max-width="600"
					v-model="dialog"
					><form>
						<v-card class="mx-auto pa-5" outlined>
							<v-list-item three-line>
								<v-list-item-content>
									<div class="text-overline mb-4">Добавить трек</div>

									<v-text-field
										v-model="input.name"
										:rules="rules.name"
										label="Название трека"
										required
									></v-text-field>
									<v-text-field
										v-model="input.desc"
										:rules="rules.desc"
										label="Описание трека"
										required
									></v-text-field>
									<v-file-input
										accept="audio/*"
										prepend-icon=""
										append-icon="mdi-volume-medium"
										:rules="rules.fileAudio"
										v-model="input.fileAudio"
										label="Аудиофайл"
									></v-file-input>
									<v-file-input
										accept="image/*"
										prepend-icon=""
										append-icon="mdi-camera"
										:rules="rules.fileImage"
										v-model="input.fileImage"
										label="Обложка"
									></v-file-input>
								</v-list-item-content>
							</v-list-item>

							<v-card-actions>
								<v-btn
									class="col-12"
									color="success"
									@click="handleClickAddTrack()"
									:disabled="!activeButtonAddTrack"
								>
									Добавить
								</v-btn>
							</v-card-actions>
						</v-card>
					</form>
				</v-dialog>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		links: ['Github'],
		dialog: false,

		input: {
			name: '',
			desc: '',
			fileAudio: null,
			fileImage: null,
		},

		rules: {
			name: [val => (val || '').length > 0 || 'Это поле обязательное'],
			desc: [val => (val || '').length > 0 || 'Это поле обязательное'],
			fileAudio: [
				value =>
					value == null || value.size < 20000000 || 'Файл с аудио слишком большой!',
			],
			fileImage: [
				value =>
					value == null || value.size < 20000000 || 'Файл с обложкой слишком большой!',
			],
		},
	}),

	methods: {
		async handleClickAddTrack() {
			try {
				const payload = {
					name: this.input.name,
					description: this.input.desc,
					audio_file: this.input.fileAudio,
					image: this.input.fileImage,
					is_visible: false,
				}

				const res = await this.$store.dispatch('Tracks/createTrack', payload)

				this.input = {
					name: '',
					desc: '',
					fileAudio: null,
					fileImage: null,
				}

				this.dialog = false
			} catch (e) {
				this.dialog = false
				console.log(e)
			}
		},
	},

	computed: {
		activeButtonAddTrack() {
			return (
				this.input.name.length &&
				this.input.desc.length &&
				this.input.fileAudio !== null &&
				this.input.fileImage !== null
			)
		},
	},
}
</script>

<style>
.success-notify {
	background-color: #4caf50 !important;
	font-family: 'Arial', sans-serif;
}

.error-notify {
	background-color: #ff5252 !important;
	font-family: 'Arial', sans-serif;
}
</style>
