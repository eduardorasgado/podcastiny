// libreria importante para que fetch funcione correctamente
import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import Nav from '../components/Nav'
// import AudioClips from '../components/AudioClips'
import PodcastListWithClick from '../components/PodcastListWithClick'
import PodcastPlayer from '../components/PodcastPlayer'
// custom error handling
import Error from './_error'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			openPodcast: null
		}
	}

	// clonsumiendo API
	static async getInitialProps({ query, res }) {
		// si arriba en los parametros solo pasaramos data, entonces:
		// let query = data.query
		let idChannel = query.id
		try {
			// espera a que terminen las tres request, carga la informacion y sigue
			let [reqChannel, reqAudios, reqSeries] = await Promise.all([
				fetch(`https://api.audioboom.com/channels/${idChannel}`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
				fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
			])

			// fetch handling para errores desde 400 al 500 etc
			if (reqChannel.status >= 400) {
				res.statusCode = reqChannel.status
				return { channel: null,
								 audioClips: null,
								 series: null,
								 statusCode: reqChannel.status }
			}

			// ahora a construir las json para ocuparlas en el component
			let [dataChannel, dataAudios, dataSeries] = await Promise.all([
				reqChannel.json(),
				reqAudios.json(),
				reqSeries.json()
			])

			// extraemos los features que queremos de los json
			let channel = dataChannel.body.channel
			let audioClips = dataAudios.body.audio_clips
			let series = dataSeries.body.channels

			// retornar como parte de las props
			return { channel, audioClips, series, statusCode: 200 }

		} catch (e) {
			// necesario para considerar de forma apropiada el error
			res.statusCode = 503
			return { channel: null, audioClips: null, series: null, statusCode: 503}
		}
	
	}

	// evento de click
	openPodcast = (event, podcast) => {
		event.preventDefault()
		this.setState({
			openPodcast: podcast
		})
	}

	// cerrar el modal podcast
	closePodcast = (event) => {
		event.preventDefault()
		this.setState({
			openPodcast: null
		})
	}

	render () {

		const { channel, audioClips, series, statusCode } = this.props
		const { openPodcast } = this.state

		// early return
		if(statusCode !== 200) {
			// error handling para error 503, no red
			return <Error statusCode={ statusCode } />
		}

		return(
				<Layout title={channel.title} >

	      	<div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
					
					<Nav channel={``} color={`#0E111A`} linkName={`Inicio`}/>

					{ openPodcast && 
						<div className="modal">
							<PodcastPlayer 
									clip={ openPodcast } 
									onClose={ this.closePodcast }/>
						</div> }

					<h1>{channel.title}</h1>
					<ChannelGrid channels={series}/>

					<h2>Últimos Podcast</h2>
					<PodcastListWithClick podcasts={ audioClips }
																onClickPodcast={ this.openPodcast }/>

					<style jsx>{`
		        .banner {
		          width: 100%;
		          padding-bottom: 25%;
		          background-position: 50% 50%;
		          background-size: cover;
		          background-color: #aaa;
		        }

		        h1 {
		          font-weight: 600;
		          padding: 15px;
		        }

		        :global(h2) {
		          padding: 5px;
		          font-size: 1.5em;
		          font-weight: 600;
		          margin: 0;
		          text-align: center;
		        }

		        .modal {
		          position: fixed;
		          top: 0;
		          left: 0;
		          right: 0;
		          bottom: 0;
		          background: white;
		          z-index: 99999;
		        }

		      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: Lato;
          background: white;
        }
      `}</style>
				</Layout>
			)
	}
}