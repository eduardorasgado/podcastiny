import Link from 'next/link'

export default class Series extends React.Component {
	render() {
		const {children, series } = this.props
		return(
				<div>
					{
						series.length > 0 &&
						<div>
							<h2>Series</h2>
							{ series.map((serie) => (
								<div className="channels" key="serie.id">
									<Link href={`/channel?id=${serie.id}`}>
										<a className="channel">
											<img src={serie.urls.logo_image.original} />
											<h2>{ serie.title }</h2>
										</a>
									</Link>
								</div>
							))}
						</div>
					}
				</div>
			)
	}
}