// gracias a esta libreria funciona fetch
import 'isomorphic-fetch'
//libreria para linkear componentes
import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'

export default class extends React.Component {

	//llama a la api, recibe los canales y los inserta a las props
	static async getInitialProps() {
		let req = await fetch('https://api.audioboom.com/channels/recommended')
		let { body: channels } = await req.json()

		// retornar como parte de las props
		return { channels }
	}
	render() {
		//const channels = this.props.channels
		const { channels } = this.props
		return (
				<Layout title="Podcastiny">

					<ChannelGrid channels={ channels } />
					
				</Layout>
			)
	}
}