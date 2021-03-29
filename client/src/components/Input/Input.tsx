import React, { ChangeEvent, Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'

export interface InputProps {
  name: string
  type: string
  value: string
  placeholder: string
  handleChange: (event: ChangeEvent) => void
}

export default class Input extends Component<InputProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render () {
    return (
      <input
        className={styles.input}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        role="input"
        onChange={this.props.handleChange} />
    )
  }
}
