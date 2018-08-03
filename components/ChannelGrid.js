import Link from 'next/link'

export default class ChannelGrid extends React.Component {
	render () {
		const { children, channels } = this.props
		return (
				<div className="channels">
					{ channels.map((channel) => (
						// link permite prerenderizar del lado del cliente
						// cuando hay que cargar algo liviano, prefetch ayuda a no cargar el getInitialProos
						// prefetch solo carga html, css, js
						// prefetch solo funciona en produccion
						// npm run build && npm start
						<Link key={channel.id} href={`/channel?id=${ channel.id }`} prefetch>
							<div className="channel">
								<img src={ channel.urls.logo_image.original} alt="" />
								<h2>{ channel.title }</h2>
							</div>
						</Link>
					)) }

					<style jsx>{`
					/* CSS GRID */
					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
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