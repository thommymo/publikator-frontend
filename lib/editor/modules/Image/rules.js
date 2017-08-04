import React, { createElement } from 'react'
import { Block, Text } from 'slate'

const ImageWithCaption = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),

  render: ({ children, ...props }) => {
    const [image, caption, source] = children
    const Container = get('Image.Blocks.ImageWithCaption')
    const CaptionSection = get(
      'Image.Blocks.CaptionSection'
    )
    return (
      <Container {...props}>
        {image}
        <CaptionSection>
          {caption}
          {source}
        </CaptionSection>
      </Container>
    )
  }
})

const Image = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE'),

  render: props => {
    const { node } = props
    const src = node.data.get('src')
    const Image = get('Image.Blocks.Image')
    const ImagePlaceholder = get(
      'Image.Blocks.ImagePlaceholder'
    )
    if (src) {
      return <Image src={node.data.get('src')} {...props} />
    }
    return <ImagePlaceholder {...props} />
  }
})

const ImageCaption = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_CAPTION'),

  render: props =>
    createElement(get('Image.Blocks.ImageCaption'), props)
})

const ImageSource = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_SOURCE'),

  render: props => {
    return createElement(
      get('Image.Blocks.ImageSource'),
      props
    )
  }
})

const NeverEmpty = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),
  validate: node => {
    return node.nodes.size < 1 ? node : null
  },

  normalize: (transform, node) => {
    return transform.removeNodeByKey(node.key)
  }
})

const AlwaysThreeChildren = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),
  validate: node => {
    return node.nodes.size > 3 ? node.nodes : null
  },

  normalize: (transform, node, children) => {
    let updatedTransform = transform
    children.skip(3).forEach(v => {
      updatedTransform = updatedTransform.removeNodeByKey(
        v.key
      )
    })
    return transform
  }
})

const AlwaysImageFirst = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),
  validate: node => {
    return node.nodes.get(0).type !==
    get('Image.Constants.IMAGE')
      ? node.nodes
      : null
  },

  normalize: (transform, node, children) => {
    return transform.insertNodeByKey(
      node.key,
      0,
      Block.create({
        type: get('Image.Constants.IMAGE'),
        isVoid: true
      })
    )
  }
})

const AlwaysCaptionSecond = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),
  validate: node => {
    if (!node.nodes.get(1)) {
      return node
    } else if (
      node.nodes.get(1).type !==
      get('Image.Constants.IMAGE_CAPTION')
    ) {
      return node.nodes.get(1)
    }
  },

  normalize: (transform, node, captionNode) => {
    let updatedTransform = transform
    if (
      captionNode === node ||
      captionNode.type ===
        get('Image.Constants.IMAGE_SOURCE')
    ) {
      updatedTransform = updatedTransform.insertNodeByKey(
        node.key,
        1,
        Block.create({
          type: get('Image.Constants.IMAGE_CAPTION'),
          nodes: [Text.createFromString('')]
        })
      )
    } else {
      updatedTransform = updatedTransform.setNodeByKey(
        captionNode.key,
        { type: get('Image.Constants.IMAGE_CAPTION') }
      )
    }
    return updatedTransform
  }
})

const AlwaysSourceThird = get => ({
  match: ({ kind, type }) =>
    kind === 'block' &&
    type === get('Image.Constants.IMAGE_WITH_CAPTION'),
  validate: node => {
    if (!node.nodes.get(2)) {
      return node
    } else if (
      node.nodes.get(2).type !==
      get('Image.Constants.IMAGE_SOURCE')
    ) {
      return node.nodes.get(2)
    }
  },

  normalize: (transform, node, sourceNode) => {
    let updatedTransform = transform
    if (sourceNode === node) {
      updatedTransform = updatedTransform.insertNodeByKey(
        node.key,
        2,
        Block.create({
          type: get('Image.Constants.IMAGE_SOURCE'),
          nodes: [Text.createFromString('')]
        })
      )
    } else {
      updatedTransform = updatedTransform.setNodeByKey(
        sourceNode.key,
        { type: get('Image.Constants.IMAGE_SOURCE') }
      )
    }
    return updatedTransform
  }
})

export default get => [
  NeverEmpty(get),
  AlwaysThreeChildren(get),
  AlwaysImageFirst(get),
  AlwaysCaptionSecond(get),
  AlwaysSourceThird(get),
  ImageWithCaption(get),
  Image(get),
  ImageCaption(get),
  ImageSource(get)
]