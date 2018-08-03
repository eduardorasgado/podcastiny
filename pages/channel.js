import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import Series from '../components/Series'
import Nav from '../components/Nav'
import AudioClips from '../components/AudioClips'

export default class extends React.Component {

	// clonsumiendo API
	static async getInitialProps({ query }) {
		// si arriba en los parametros solo pasaramos data, entonces:
		// let query = data.query
		let idChannel = query.id

		// espera a que terminen las tres request, carga la informacion y sigue
		let [reqChannel, reqAudios, reqSeries] = await Promise.all([
			fetch(`https://api.audioboom.com/channels/${idChannel}`),
			fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
			fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
		])

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
		return { channel, audioClips, series }
	}

	render () {

		const { channel, audioClips, series } = this.props

		return(
				<Layout title={channel.title} >

	      	<div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
					
					<Nav link={`/`}/>
					<h1>{channel.title}</h1>
					<Series series={series}/>

					<AudioClips audioClips={audioClips}/>

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