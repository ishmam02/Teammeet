import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  width: string,
  height: string,
  marginTop?: string,
  marginBottom?: string,
  paddingBottom?: string,
  shape?: 'rectangle' | 'round'
}

export default class Skeleton extends Component<SkeletonProps> {
  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
    paddingBottom: PropTypes.string,
    shape: PropTypes.string
  }

  static defaultProps = {
    marginTop: '0',
    marginBottom: '0',
    paddingBottom: '0',
    shape: 'rectangle'
  }

  get styles () {
    return {
      width: this.props.width,
      height: this.props.height,
      marginTop: this.props.marginTop,
      marginBottom: this.props.marginBottom,
      paddingBottom: this.props.paddingBottom
    }
  }

  get className () {
    const { shape } = this.props
    const shapeClass = shape && styles[shape]
    return `${styles.skeleton} ${shapeClass}`
  }

  render () {
    return <div className={this.className} style={this.styles} />
  }
}
