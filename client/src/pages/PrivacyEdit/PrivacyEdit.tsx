import React, { Component } from 'react'
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react'
import { RouteComponentProps, withRouter } from 'react-router'
import Quill from 'quill'
import Request from './PrivacyEdit.request'
import AdminMiddleware from '../../middleware/AdminMiddleware'
import Page from '../../components/Page/Page'
import Button from '../../components/Button/Button'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import styles from './PrivacyEdit.module.scss'

interface PrivacyEditProps extends RouteComponentProps {}

interface PrivacyEditState {
  privacy: string
}

class PrivacyEdit extends Component<PrivacyEditProps, PrivacyEditState> {
  protected request: Request

  protected adminMiddleware: AdminMiddleware

  constructor (props: PrivacyEditProps) {
    super(props)
    this.request = new Request()
    this.adminMiddleware = new AdminMiddleware()
    this.adminMiddleware.auth(this.props.history)
    this.state = {
      privacy: ''
    }
    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  setContent (quill: Quill) {
    this.request.read((privacy: any) => {
      this.setState({ privacy })
      const delta = quill.clipboard.convert(privacy)
      quill.setContents(delta, 'silent')
    })
  }

  handleContentChange (quill: Quill) {
    quill.on('text-change', () => {
      const privacy = quill.root.innerHTML
      this.setState({ privacy })
    })
  }

  initializeEditor (callback: (quill: Quill) => void) {
    var toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link']
    ]
    const quill = new Quill('#privacyEitor', {
      modules: {
        toolbar: toolbarOptions,
        clipboard: {
          matchVisual: false
        }
      },
      theme: 'snow'
    })
    callback(quill)
  }

  handleSaveClick () {
    this.request.update(this.state.privacy)
  }

  componentDidMount () {
    this.initializeEditor(quill => {
      this.setContent(quill)
      this.handleContentChange(quill)
    })
  }

  render () {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Page flip={false} container="large">
            <IonGrid>
              <IonRow>
                <IonCol>
                  <AdminMenu />
                  <div className={styles.privacyEdit}>
                    <div id="privacyEitor" />
                    <div className={styles.save}>
                      <Button text="Save" handleClick={this.handleSaveClick} />
                    </div>
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

export default withRouter(PrivacyEdit)
