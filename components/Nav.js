import Link from 'next/link'

export default class Nav extends React.Component {
	render () {
		const { children, link, color } = this.props
		return (
				<div>
					<nav>
            <Link href={link}>
              <a className='close'>&lt; Inicio</a>
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