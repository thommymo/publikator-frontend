import React from 'react'
import { css } from 'glamor'
import { createBlockButton } from '../utils'
import { LEAD } from './'
import styles from '../styles'

export const LeadButton = createBlockButton(LEAD)(
  ({ active, disabled, ...props }) =>
    <span
      {...{...css(styles.blockButton), ...props}}
      data-active={active}
      data-disabled={disabled}
      >
      Lead
    </span>
)

export default {
  LeadButton
}
