export default class extends React.Component {

	static async getInitialProps({ query }) {
		// si arriba en los parametros solo pasaramos data, entonces:
		// let query = data.query
		let idChannel = query.id
		let req = await fetch(`https://api.audioboom.com/channels/${idChannel}`)
		// tomar la variable channel como un atributo
		let { body: { channel } } = await req.json()

		return { channel }
	}

	render () {

		const { channel } = this.props

		return(
				<div>
				<header>Podcastiny</header>
					<h1>{channel.title}</h1>

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