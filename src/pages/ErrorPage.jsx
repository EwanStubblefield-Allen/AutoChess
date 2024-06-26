import React from 'react'
import { useRouteError } from 'react-router-dom'
import '../assets/scss/pages/ErrorPage.scss'
import { logger } from '../utils/Logger.ts'

export default function ErrorPage() {
  const error = useRouteError()
  logger.error(error)

  return (
    <div id="error-page" className="bg-dark text-light full-page">
      <div className="container">
        <div className="col-md-10 m-auto">
          <h1 className="display-3">Oops! {error.status}</h1>
          <p className="lead">Sorry, an unexpected error has occurred.</p>
          <p className="small">
            <i>
              {error.statusText} | {error.data || error.message}
            </i>
          </p>
        </div>
      </div>
    </div>
  )
}
