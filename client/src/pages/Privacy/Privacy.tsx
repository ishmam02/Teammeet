import React, { Component } from 'react'
import { IonContent, IonPage, IonCol, IonGrid, IonRow } from '@ionic/react'
import PrivacyRequest from './Privacy.request'
import Page from '../../components/Page/Page'
import PrivacySkeleton from '../../components/PrivacySkeleton/PrivacySkeleton'
import styles from './Privacy.module.scss'

interface PrivacyState {
  privacy: string
}

export default class Privacy extends Component<any, PrivacyState> {
  protected request: PrivacyRequest

  constructor (props: any) {
    super(props)
    this.request = new PrivacyRequest()
    this.state = {
      privacy: ''
    }
  }

  setPrivacy () {
    this.request.read(body => {
      this.setState({ privacy: body })
    })
  }

  componentDidMount () {
    this.setPrivacy()
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="large">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div className={styles.privacy}>
                    <h1>Privacy Policy</h1>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: this.state.privacy }} />
                    <PrivacySkeleton privacy={this.state.privacy} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Page>
        </IonContent>
      </IonPage>
    )
  }
}
