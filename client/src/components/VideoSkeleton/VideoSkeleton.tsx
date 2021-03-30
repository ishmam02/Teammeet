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
      <IonCol>
        <div className={styles.videoSkeleton}>
          <Skeleton
            width="100vw"
            height="100vh" />
          <IonIcon
            className={styles.icon}
            icon={videocamOutline} />
        </div>
      </IonCol>
  }
}
