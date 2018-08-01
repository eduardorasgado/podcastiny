export default class extends React.Component {
	render() {
		return (
				<div>
					<h1>Hola mundo!</h1>
					<p>Bienvenidos al curso de nextJS</p>

					<style jsx>{`
							h1 {
								color: #0791E6;
							}
							p {
								color: #7FD136;
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