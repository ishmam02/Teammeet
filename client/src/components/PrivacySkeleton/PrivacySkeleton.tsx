import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { random, range } from 'lodash'
import Skeleton from '../Skeleton/Skeleton'

interface PrivacySkeletonProps {
  privacy: any
}

export default class PrivacySkeleton extends Component<PrivacySkeletonProps> {
  static propTypes = {
    privacy: PropTypes.any
  }

  paragraph (lines: number) {
    return (
      range(lines).map(line =>
        <Skeleton
          width={`${random(80, 100)}%`}
          height="11px"
          marginBottom="5px"
          key={line} />
      )
    )
  }

  render () {
    return (!this.props.privacy) &&
      <Fragment>
        <div>{this.paragraph(3)}</div>
        <Skeleton
          width={`${random(175, 200)}px`}
          height="18px"
          marginBottom="25px"
          marginTop="25px" />
        <div>{this.paragraph(5)}</div>
      </Fragment>
  }
}
