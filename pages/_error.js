import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
// esta pagina debe de llamarse _error.js para ser reconocida como la
// pagina de error por defecto
export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    return (
      <Layout title="Oh no! :(">
        { statusCode === 404 ? 
            <div className="message">
              <h1>Ops! Esta página no existe</h1>
              <p>Aqui no hay ni polvo. Que tal si regresas a la página principal
                  a buscar algo de tu interés ;)</p>
              <Link href={`/`} >
                <a className="enlace">
                  <button>Muéstrame esos Podcastinys!</button>
                </a>
              </Link>
            </div>
            :
            <div className="message">
              <h1> Algo salió mal :S</h1>
              <p>Intenta nuevamente en unos segundos.</p>
            </div>
         }
        <style jsx>{`
          .message {
            padding: 100px 30px;
          }
          p {
            color: black;
            margin: auto;
          }
          a.enlace {
            text-decoration: none;
          }
          button {
            margin-top: 50px;
            color: white;
            background-color: #8756ca;
            border: none;
            padding: 10px;
            font-size: 1.1em;
            border-radius: 10px;
            cursor: pointer;
          }
        `}</style>
      </Layout>
    )
  }
}