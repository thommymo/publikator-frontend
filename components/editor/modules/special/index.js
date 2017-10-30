import { colors } from '@project-r/styleguide'
import { Block } from 'slate'

import { matchBlock } from '../../utils'

import createUi from './ui'

export default ({rule, subModules, TYPE}) => {
  const zone = {
    match: matchBlock(TYPE),
    matchMdast: (node) => node.type === 'zone',
    fromMdast: (node, index, parent, visitChildren) => {
      return {
        kind: 'block',
        type: TYPE,
        data: {
          identifier: node.identifier,
          ...node.data
        },
        isVoid: true
      }
    },
    toMdast: (object, index, parent, visitChildren, context) => {
      const {identifier, ...data} = object.data
      return {
        type: 'zone',
        identifier,
        data: data,
        children: []
      }
    },
    render: ({ node, value, attributes }) => {
      const active = value.blocks.some(block => block.key === node.key)
      return (
        <div style={{
          width: '100%',
          height: '20vh',
          paddingTop: '8vh',
          textAlign: 'center',
          backgroundColor: colors.primaryBg,
          transition: 'outline-color 0.2s',
          outline: '4px solid transparent',
          outlineColor: active ? colors.primary : 'transparent',
          marginBottom: 10
        }} {...attributes}>
          {node.data.get('identifier') || 'Special'}
        </div>
      )
    }
  }

  const newBlock = () => Block.fromJSON(
    zone.fromMdast({
      type: 'zone',
      identifier: 'SPECIAL',
      data: {}
    })
  )

  return {
    TYPE,
    helpers: {
      newBlock
    },
    changes: {},
    ui: createUi({TYPE, newBlock}),
    plugins: [
      {
        schema: {
          rules: [
            zone
          ]
        }
      }
    ]
  }
}
