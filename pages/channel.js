import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import Series from '../components/Series'

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
					
					<nav>
            <Link href={`/`}>
              <a className='close'>&lt; Inicio</a>
            </Link>
          </nav>
					<h1>{channel.title}</h1>

					<Series series={series}/>

					<h2>Últimos Podcast</h2>
					{ audioClips.map((clip) => (
						<Link key={clip.id} href={`/podcast?id=${clip.id}`}>
							<a className="podcast">
								<h3>{ clip.title }</h3>
								<div className="meta">
									{Math.ceil(clip.duration / 60)} minutos
								</div>
							</a>
						</Link>
					))}

					<style jsx>{`

		        nav {
		          background: none;
		        }
		        nav a {
		          display: inline-block;
		          padding: 15px;
		          color: #0E111A;
		          cursor: pointer;
		          text-decoration: none;
		        }

		        .banner {
		          width: 100%;
		          padding-bottom: 25%;
		          background-position: 50% 50%;
		          background-size: cover;
		          background-color: #aaa;
		        }

		        .channels {
		          display: grid;
		          grid-gap: 15px;
		          padding: 15px;
		          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		        }
		        a.channel {
		          display: block;
		          margin-bottom: 0.5em;
		          color: #333;
		          text-decoration: none;
		        }
		        .channel img {
		          border-radius: 3px;
		          box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
		          width: 100%;
		        }
		        h1 {
		          font-weight: 600;
		          padding: 15px;
		        }
		        h2 {
		          padding: 5px;
		          font-size: 0.9em;
		          font-weight: 600;
		          margin: 0;
		          text-align: center;
		        }

		        .podcast {
		          display: block;
		          text-decoration: none;
		          color: #333;
		          padding: 15px;
		          border-bottom: 1px solid rgba(0,0,0,0.2);
		          cursor: pointer;
		        }
		        .podcast:hover {
		          color: #000;
		        }
		        .podcast h3 {
		          margin: 0;
		        }
		        .podcast .meta {
		          color: #666;
		          margin-top: 0.5em;
		          font-size: 0.8em;
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