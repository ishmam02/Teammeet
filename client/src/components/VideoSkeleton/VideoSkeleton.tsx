import { IonCol, IonIcon } from '@ionic/react'
import { videocamOutline } from 'ionicons/icons'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Skeleton from '../Skeleton/Skeleton'
import styles from './VideoSkeleton.module.scss'

interface VideoSkeletonProps {
  video: any
}

export default class VideoSkeleton extends Component<VideoSkeletonProps> {
  static propTypes = {
    video: PropTypes.any
  }

  render () {
    return (!this.props.video) &&
      <IonCol size="12">
        <div className={styles.videoSkeleton}>
          <Skeleton
            width="100%"
            height="0"
            paddingBottom="calc(100% / (16/9))" />
          <IonIcon
            className={styles.icon}
            icon={videocamOutline} />
        </div>
      </IonCol>
  }
}
