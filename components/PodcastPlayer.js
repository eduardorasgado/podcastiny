import 'isomorphic-fetch'
import Link from 'next/link'
import Layout from './Layout'
import Nav from './Nav'
import Player from './Player'
import Error from '../pages/_error'

export default class PodcastPlayer extends React.Component {

	render () {
		const { clip, onClose } = this.props

		return (
				<div className='clip'>
					{
						onClose ?
						<nav>
							<a onClick={ onClose }>&lt; Volver</a>
						</nav>
						:
						<Nav channel={ clip.channel }
		        				color={`white`}
		        				linkName={`caca`}/>
					}
					<picture>
            <div style={{backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})`}}/>
          </picture>

          <Player clip={clip}/>

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
		          background: white;
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
				</div>
			)
	}
}