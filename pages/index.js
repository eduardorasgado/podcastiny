// gracias a esta libreria funciona fetch
import 'isomorphic-fetch'
//libreria para linkear componentes
import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component {

	//llama a la api, recibe los canales y los inserta a las props
	static async getInitialProps() {
		try {
			let req = await fetch('https://api.audioboom.com/channels/recommended')
			let { body: channels } = await req.json()

			// retornar como parte de las props
			return { channels, statusCode: 200 }
		} catch(e) {
			return { channels: null, statusCode: 503 }
		}
	}
	render() {
		//const channels = this.props.channels
		const { channels, statusCode } = this.props
		// early return
		if(statusCode !== 200) {
			return <Layout title="Podcastiny: ERROR">
				<div>Ops! Parece que algo rompió el server o la conección</div>
			</Layout>
		}
		return (
				<Layout title="Podcastiny">

					<ChannelGrid channels={ channels } />
					
				</Layout>
			)
	}
}