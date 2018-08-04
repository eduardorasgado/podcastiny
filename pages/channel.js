// libreria importante para que fetch funcione correctamente
import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import Series from '../components/Series'
import Nav from '../components/Nav'
import AudioClips from '../components/AudioClips'
// custom error handling
import Error from './_error'

export default class extends React.Component {

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

	render () {

		const { channel, audioClips, series, statusCode } = this.props

		// early return
		if(statusCode !== 200) {
			// error handling para error 503, no red
			return <Error statusCode={ statusCode } />
		}

		return(
				<Layout title={channel.title} >

	      	<div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
					
					<Nav link={`/`} color={`#0E111A`}/>
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