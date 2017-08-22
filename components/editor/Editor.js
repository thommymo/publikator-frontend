import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor as SlateEditor } from 'slate'
import { css } from 'glamor'
import BasicDocument from './BasicDocument'
import styles from './styles'

const getUI = state => {
  switch (state.getIn(['document', 'data', 'documentType'])) {
    default:
      return BasicDocument
  }
}

const Container = ({ children }) => (
  <div {...css(styles.container)}>{ children }</div>
)

const Sidebar = ({ children }) => (
  <div {...css(styles.sidebar)}>{ children }</div>
)

const Document = ({ children }) => (
  <div {...css(styles.document)}>{ children }</div>
)

class Editor extends Component {
  changeHandler (nextState) {
    const { state, onChange, onDocumentChange } = this.props

    if (state !== nextState) {
      onChange(nextState)
      if (state.document !== nextState.document) {
        onDocumentChange(nextState.document, nextState)
      }
    }
  }

  render () {
    const { state } = this.props
    const UI = getUI(state)
    const props = {
      onChange: this.changeHandler,
      Editor: SlateEditor,
      Container,
      Sidebar,
      Document,
      state
    }
    return (
      <UI {...props} />
    )
  }
}

Editor.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onDocumentChange: PropTypes.func
}

Editor.defaultProps = {
  onChange: () => true,
  onDocumentChange: () => true
}

export default Editor
