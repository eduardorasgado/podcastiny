// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

export default class Nav extends React.Component {
	render () {
		const { children, channel, color, linkName } = this.props
		return (
				<div>
					<nav>
            { channel == "" ? 
            <Link href={ "/" }>
            	<a className='close'>&lt; {linkName}</a>
            </Link>
            	:
            	<Link key={channel.id} 
									route="channel"
									params={{ 
										slug: slug(channel.title),
										id: channel.id 
									}} 
									prefetch>
              		<a className='close'>&lt; {linkName}</a>
            	</Link>
            }
          </nav>

          <style jsx>{`
          	nav {
		          background: none;
		          width: 40vw;
		        }
		        nav a {
		          display: inline-block;
		          padding: 15px;
		          color: ${color};
		          cursor: pointer;
		          text-decoration: none;
		        }
          `}</style>
				</div>
			)
	}
}