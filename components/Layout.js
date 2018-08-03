import Link from 'next/link'

export default class Layout extends React.Component {
	render() {
		const { children } = this.props
		return (
				<div>
				<header><Link href="/"><a>Podcastiny</a></Link></header>
				{ children }
				<style jsx global>{`
						body {
							margin: 0;
							font-family: Lato;
							background: white;
							text-align: center;
						}
				`}</style>

				<style jsx>{`
					header {
							color: #fff;
							background: #8756ca;
							padding: 15px;
						}

					header a {
						color #fff;
						text-decoration: none;
					}
				`}</style>

				</div>
			)
	}
}