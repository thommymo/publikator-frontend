import { ascending, descending } from 'd3-array'

export const transformData = props => {
  let commits = props.commits
    .map(commit => {
      return {
        id: commit.id,
        date: commit.date,
        author: commit.author,
        message: commit.message,
        parentIds: commit.parentIds,
        milestones: props.milestones.filter(o => {
          return o.commit.id === commit.id
        })
      }
    })
    .sort(function (a, b) {
      return ascending(new Date(a.date), new Date(b.date))
    })

  let parentNodes = new Map()
  let links = []

  commits.forEach(commit => {
    commit.setListItemRef = ref => {
      commit.listItemRef = ref
    }
    commit.setNodeRef = ref => {
      commit.nodeRef = ref
    }
    commit.setMilestoneBarRef = ref => {
      commit.milestoneBarRef = ref
    }
    commit.data = {
      slotIndex: null
    }
    if (!commit.parentIds) return
    commit.parentIds.forEach(parentId => {
      let children = []
      if (parentNodes.has(parentId)) {
        children = [...parentNodes.get(parentId)]
      }
      if (!children.indexOf(commit.id) === -1) {
        return
      }
      children.push(commit.id)
      parentNodes.set(parentId, children)
      links.push({
        sourceId: parentId,
        destinationId: commit.id
      })
    })
  })

  links.forEach(link => {
    link.setRef = ref => {
      link.ref = ref
    }
  })

  assignSlots(commits, parentNodes)

  return {
    commits: commits,
    links: links,
    parentNodes: parentNodes
  }
}

const getPaths = (commits, parentNodes) => {
  // Walks and collects all possible upward paths on the tree.
  let paths = []
  let pathsToWalk = [[commits[0].id]]

  do {
    let path = pathsToWalk[0]
    let nextId = path.pop()
    do {
      let children = parentNodes.get(nextId)
      path.push(nextId)
      nextId = null
      if (children && !!children.length) {
        nextId = children.pop()
        children.forEach(child => {
          pathsToWalk.push([...path, child])
        })
      }
    } while (nextId)
    paths.push(path)
    pathsToWalk.shift()
  } while (pathsToWalk.length)

  return paths
}

const getOrderedPaths = paths => {
  // TODO: More sophisticated ordering.
  return paths.sort(function (a, b) {
    return descending(a.length, b.length)
  })
}

const assignSlots = (commits, parentNodes) => {
  let paths = getPaths(commits, parentNodes)
  let orderedPaths = getOrderedPaths(paths)
  commits.sort(function (a, b) {
    return descending(new Date(a.date), new Date(b.date))
  })

  commits.forEach(commit => {
    orderedPaths.some((orderedPath, i) => {
      if (orderedPath.indexOf(commit.id) > -1) {
        commit.data.slotIndex = orderedPaths.length - 1 - i
        return true
      }
    })
  })
}
