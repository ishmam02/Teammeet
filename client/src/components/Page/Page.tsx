import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Brand from '../Brand/Brand'
import Alert from '../Alert/Alert'
import styles from './Page.module.scss'

interface PageProps {
  flip: boolean,
  container: 'small' | 'large'
}

export default class Page extends Component<PageProps> {
  static propTypes = {
    flip: PropTypes.bool.isRequired,
    container: PropTypes.oneOf(['small', 'large']).isRequired,
    children: PropTypes.element
  }

  get className () {
    const flipClass = this.props.flip && styles.flip
    const containerClass = styles[this.props.container]
    return `${styles.page} ${flipClass} ${containerClass}`
  }

  render () {
    return (
      <div className={this.className} role="page">
        <div className={styles.main}>
          <Brand invert={this.props.flip} />
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
        <div className={styles.footer}>
          <img
            className={styles.background}
            src="/assets/background.svg"
            alt="Background" />
        </div>
        <Alert />
      </div>
    )
  }
}
