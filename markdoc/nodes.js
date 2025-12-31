import { nodes as defaultNodes } from '@markdoc/markdoc'
import { Fence } from '@/components/Fence'

const nodes = {
  document: {
    ...defaultNodes.document,
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th?.attributes,
      scope: {
        type: String,
        default: 'col',
      },
    },
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  },
}

export default nodes
