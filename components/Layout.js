import Link from 'next/link'
import Head from 'next/head'

export default class Layout extends React.Component {
	render() {
		const { children, title } = this.props
		return (
				<div>
				<Head>
					<meta name="viewport" content="width-device-width, initial-scale=1" />
					<title>{title}</title>
				</Head>
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