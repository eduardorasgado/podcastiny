import Link from 'next/link'

export default class Nav extends React.Component {
	render () {
		const { children, link, color, linkName } = this.props
		return (
				<div>
					<nav>
            <Link href={link}>
              <a className='close'>&lt; {linkName}</a>
            </Link>
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