import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Player from '../components/Player'

export default class extends React.Component {

	static async getInitialProps ({ query }) {
			let idClip = query.id
			// api a: https://api.audioboom.com/audio_clips/6908320
			let req = await fetch(`https://api.audioboom.com/audio_clips/${idClip}.mp3`)
			let clipjson = await req.json()
			let clip = clipjson.body.audio_clip
			return { clip }
	}

	render() {
		const { clip } = this.props
		return (
				<Layout title={`${clip.channel.title}: ${clip.title}`}>
		      <div className='modal'>
		        <div className='clip'>
		        	<Nav link={`/channel?id=${clip.channel.id}`} color={`white`}/>
		          
		          <picture>
		            <div style={{backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})`}}/>
		          </picture>

		          <Player clip={clip}/>
		        </div>
		      </div>

		      <style jsx>{`
		        nav {
		          background: none;
		        }
		        nav a {
		          display: inline-block;
		          padding: 15px;
		          color: white;
		          cursor: pointer;
		          text-decoration: none;
		        }
		        .clip {
		          display: flex;
		          height: 100%;
		          flex-direction: column;
		          background: #8756ca;
		          color: white;
		        }
		        picture {
		          display: flex;
		          align-items: center;
		          justify-content: center;
		          flex: 1 1;
		          flex-direction: column;
		          width: auto;
		          padding: 10%;
		        }
		        picture div {
		          width: 100%;
		          height: 100%;
		          background-position: 50% 50%;
		          background-size: contain;
		          background-repeat: no-repeat;
		        }
		        .modal {
		          position: fixed;
		          top: 0;
		          left: 0;
		          right: 0;
		          bottom: 0;
		          z-index: 99999;
		        }

		        .close {
		        	font-family: Lato;
		        	font-weight: 800;
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