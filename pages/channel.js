export default class extends React.Component {

	// clonsumiendo API
	static async getInitialProps({ query }) {
		// si arriba en los parametros solo pasaramos data, entonces:
		// let query = data.query
		let idChannel = query.id
		let reqChannel = await fetch(`https://api.audioboom.com/channels/${idChannel}`)
		// tomar la variable channel como un atributo
		// let { body: { channel } } = await req.json()  es lo mismo que:
		let dataChannel = await reqChannel.json()
		let channel = dataChannel.body.channel

		// https://api.audioboom.com/channels/4702115/audio_clips
		let reqAudios = await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
		let dataAudios = await reqAudios.json()
		let audioClips = dataAudios.body.audio_clips

		let reqSeries = await fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
		let dataSeries = await reqSeries.json()
		let series = dataSeries.body.channels

		// retornar como parte de las props
		return { channel, audioClips, series }
	}

	render () {

		const { channel, audioClips, series } = this.props

		return(
				<div>
				<header>Podcastiny</header>
					<h1>{channel.title}</h1>

					<h2>Series</h2>
					{ series.map((serie) => (
						<div>
							{ serie.title }
						</div>
					))}
					<h2>Últimos Podcast</h2>
					{ audioClips.map((clip) => (
						<div key={clip.id}>
							{ clip.title }
						</div>
					))}

					<style jsx>{`
						header {
							color: #fff;
							background: #8756ca;
							padding: 15px;
						}

						/* CSS GRID */
						.channels {
							display: grid;
							grid-gap: 15px;
							padding: 15px;
							grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))
						}

						.channel {
							display: block;
							border-radius: 3px;
							box-shadow: 0px 2px 6px rgba(0,0,0, 0.15);
							margin-bottom: 0.5em;
						}

						.channel img {
							width: 100%;
						}

						h1 {
							font-family: Lato;
							font-weight: 600;
							padding: 15px;
						}

						h2 {
							padding: 5px;
							font-size: 0.9em;
							font-weight: 600;
							margin: 0;
							text-align: center;
						}
					`}</style>
				</div>
			)
	}
}