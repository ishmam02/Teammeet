import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import routes from '../../routes'
import styles from './Brand.module.scss'

interface BrandProps {
  invert: boolean
}

export default class Brand extends Component<BrandProps> {
  static propTypes = {
    invert: PropTypes.bool
  }

  get className () {
    const invertClass = this.props.invert && styles.invert
    return `${styles.brand} ${invertClass}`
  }

  get logo () {
    const pathResolve = (logo: string) => `/assets/logo/${logo}`
    return this.props.invert
      ? pathResolve('logoInvert.svg')
      : pathResolve('logo.svg')
  }

  render () {
    return (
      <div className={this.className} role="brand">
        <Link to={routes.home.path}>
          <img
            className={styles.logo}
            src={this.logo}
            alt="Logo"
            role="logo" />
        </Link>
        <div
          className={styles.tagline}
          role="tagline">
          {process.env.REACT_APP_TAGLINE}
        </div>
      </div>
    )
  }
}
