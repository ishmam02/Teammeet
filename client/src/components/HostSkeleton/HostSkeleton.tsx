import React, { Component } from 'react'
import { IonCard } from '@ionic/react'
import { random } from 'lodash'
import Skeleton from '../Skeleton/Skeleton'
import styles from './HostSkeleton.module.scss'

export default class HostSkeleton extends Component {
  render () {
    return (
      <IonCard>
        <div className={styles.host}>
          <div className={styles.user}>
            <Skeleton
              width={`${random(25, 35)}%`}
              height="12px"
              marginBottom="8px" />
            <Skeleton
              width={`${random(25, 35)}%`}
              height="12px"
              marginBottom="22px" />
            <Skeleton
              width="40%"
              height="15px"
              marginBottom="8px" />
            <Skeleton
              width="65%"
              height="12px" />
          </div>
          <div className={styles.actions}>
            <Skeleton
              width="35px"
              height="35px"
              shape="round" />
          </div>
        </div>
      </IonCard>
    )
  }
}
