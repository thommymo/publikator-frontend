import React from 'react'
import { css } from 'glamor'
import { createBlockButton } from '../../utils'
import { LEAD } from './constants'
import styles from '../../styles'

export const LeadButton = createBlockButton({
  type: LEAD
})(
  ({ active, disabled, visible, ...props }) =>
    <span
      {...{...css(styles.blockButton), ...props}}
      data-active={active}
      data-disabled={disabled}
      data-visible={visible}
      >
      Lead
    </span>
)
