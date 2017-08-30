import React from 'react'
import { matchBlock } from '../../utils'
import {
  TitleButton,
  MediumHeadlineButton,
  SmallHeadlineButton
} from './ui'
import {
  TITLE,
  MEDIUM_HEADLINE,
  SMALL_HEADLINE
} from './constants'

export const styles = {
  title: {
    fontSize: 36,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    lineHeight: '1.2em',
    margin: '0 0 0.2em'
  }
}

export const title = {
  match: matchBlock(TITLE),
  matchMdast: (node) => node.type === 'heading' && node.depth === 1,
  fromMdast: (node, index, parent, visitChildren) => ({
    kind: 'block',
    type: TITLE,
    nodes: visitChildren(node)
  }),
  toMdast: (object, index, parent, visitChildren) => ({
    type: 'heading',
    depth: 1,
    children: visitChildren(object)
  }),
  render: ({ children }) => <h1>{ children }</h1>
}

export const mediumHeadline = {
  match: matchBlock(MEDIUM_HEADLINE),
  matchMdast: (node) => node.type === 'heading' && node.depth === 2,
  fromMdast: (node, index, parent, visitChildren) => ({
    kind: 'block',
    type: MEDIUM_HEADLINE,
    nodes: visitChildren(node)
  }),
  toMdast: (object, index, parent, visitChildren) => ({
    type: 'heading',
    depth: 2,
    children: visitChildren(object)
  }),
  render: ({ children }) => <h1>{ children }</h1>
}

export const smallHeadline = {
  match: matchBlock(SMALL_HEADLINE),
  matchMdast: (node) => node.type === 'heading' && node.depth === 3,
  fromMdast: (node, index, parent, visitChildren) => ({
    kind: 'block',
    type: SMALL_HEADLINE,
    nodes: visitChildren(node)
  }),
  toMdast: (object, index, parent, visitChildren) => ({
    type: 'heading',
    depth: 3,
    children: visitChildren(object)
  }),
  render: ({ children }) => <h1>{ children }</h1>
}

export {
  TITLE,
  TitleButton,
  MEDIUM_HEADLINE,
  MediumHeadlineButton,
  SMALL_HEADLINE,
  SmallHeadlineButton
}

export default {
  plugins: [
    {
      schema: {
        rules: [
          title,
          mediumHeadline,
          smallHeadline
        ]
      }
    }
  ]
}