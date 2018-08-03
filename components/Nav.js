import Link from 'next/link'

export default class Nav extends React.Component {
	render () {
		const { children, link } = this.props
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
		        }
		        nav a {
		          display: inline-block;
		          padding: 15px;
		          color: #0E111A;
		          cursor: pointer;
		          text-decoration: none;
		        }
          `}</style>
				</div>
			)
	}
}