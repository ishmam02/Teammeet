import React, { Component } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import routes from '../../routes'
import AccessTokenService from '../../services/AccessTokenService'
import styles from './AdminMenu.module.scss'

interface AdminMenuProps extends RouteComponentProps {}

class AdminMenu extends Component<AdminMenuProps> {
  protected accessTokenService: AccessTokenService

  constructor (props: AdminMenuProps) {
    super(props)
    this.accessTokenService = new AccessTokenService()
    this.handleSignOutClick = this.handleSignOutClick.bind(this)
  }

  async handleSignOutClick () {
    await this.accessTokenService.remove()
    this.props.history.push(routes.home.path)
  }

  render () {
    return (
      <div className={styles.adminMenu}>
        <div className={styles.links}>
          <NavLink
            to={routes.home.path}
            activeClassName={styles.active}>
            Hosts
          </NavLink>
          <NavLink
            to={routes.home.path}
            activeClassName={styles.active}>
            Privacy Policy
          </NavLink>
          <NavLink
            to="#"
            onClick={this.handleSignOutClick}>
            Sign Out
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminMenu)
