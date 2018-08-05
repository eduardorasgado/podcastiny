// import Link from 'next/link'
// link de next router, funciona desde server.js y routes.js
import { Link } from '../routes'
// slug ayuda a convertir los nombres a strings permitidos por el url
import slug from '../helpers/slug'

export default class AudioClips extends React.Component {
	render() {
		const { children, audioClips} = this.props
		return (
				<div>
					<h2>Últimos Podcast</h2>
					{ audioClips.map((clip) => (
						<Link key={clip.id}
									route="podcast"
									params={{
										slug: slug(clip.title),
										id: clip.id,
										slugChannel: slug(clip.channel.title),
										idChannel: clip.channel.id
									}}
									prefetch>
							<a className="podcast">
								<h3>{ clip.title }</h3>
								<div className="meta">
									{Math.ceil(clip.duration / 60)} minutos
								</div>
							</a>
						</Link>
					))}

					<style jsx>{`
						
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
				</div>
			)
	}
}