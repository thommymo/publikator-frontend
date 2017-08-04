import { Placeholder } from 'slate'
import React from 'react'
import { colors } from '@project-r/styleguide'

export default {
  Image: {
    Blocks: {
      Image: ({ src }) =>
        <img style={{ width: '100%' }} src={src} />,
      CaptionSection: ({ children }) =>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {children}
        </div>,
      ImageCaption: ({ node, state, children }) =>
        <small style={{ position: 'relative' }}>
          <Placeholder
            firstOnly={false}
            parent={node}
            node={node}
            state={state}
            style={{
              position: 'relative',
              whiteSpace: 'nowrap',
              opacity: '.5'
            }}
          >
            Image caption...
          </Placeholder>
          {children}
        </small>,
      ImageSource: ({ node, state, children }) =>
        <small>
          <em>
            <Placeholder
              firstOnly={false}
              parent={node}
              node={node}
              state={state}
              style={{
                position: 'relative',
                whiteSpace: 'nowrap',
                opacity: '.5'
              }}
            >
              Image source...
            </Placeholder>
            {children}
          </em>
        </small>,
      ImagePlaceholder: () =>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              paddingBottom: '57%',
              backgroundColor: colors.divider
            }}
          />
        </div>
    }
  }
}