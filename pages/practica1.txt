export default class extends React.Component {
	render() {
		return (
				<div>
					<img src="/static/platzi-logo.png" alt="platzi logo" />
					<h1>Hola mundo!</h1>
					<p>Bienvenidos al curso de nextJS</p>

					

					<style jsx>{`
							h1 {
								color: #0791E6;
								font-family: "Lato";
								width: 200px;
								margin: auto;
								margin-top: 40px;
							}

							/*afecta a todos los p de nuestra aplicacion*/
							/*Si fuera (div p) -> todos los p dentro de un div tendran el style*/

							:global(p) {
								color: #7FD136;
								font-family: "Lato";
								width: 240px;
								margin: auto;
								margin-bottom: 40px;
							}

							img {
								max-width: 50%;
								display: block;
								margin 0 auto;
								margin-top: 40px;
							}
						`}</style>

						<style jsx global>{`
							body {
								background: #252620;
							}
						`}</style>
				</div>
			)
	}
}