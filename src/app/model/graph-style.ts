import {StylesheetStyle} from 'cytoscape';

export const style: StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      'shape': 'ellipse',
      'width': 100,
      'height': 100,
      'background-image': 'data(image)',
      'background-fit': 'cover',
      'border-width': 2,
      'border-color': '#ccc',
      'label': '',
      'text-valign': 'bottom',
      'text-halign': 'center',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': '#aaa',
      'target-arrow-color': '#aaa',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'opacity': 0.7
    }
  },
  {
    selector: '.center-node',
    style: {
      'border-color': '#374151',
      'border-width': 3
    }
  },
  {
    selector: 'node',
    style: {
      'text-valign': 'bottom',
      'text-halign': 'center',
      'label': 'data(username)',
      'font-size': 12,
      'color': '#374151',
      'text-background-opacity': 0,
      'text-margin-y': 5
    }
  },
  {
    selector: 'node',
    style: {
      'text-valign': 'bottom',
      'text-halign': 'center',
      'label': 'data(fullName)',
      'font-size': 10,
      'color': '#999',
      'text-background-opacity': 0,
      'text-margin-y': -15
    }
  },
  {
    selector: 'node',
    style: {
      'text-valign': 'top',
      'text-halign': 'right',
      'font-size': 16,
      'color': '#374151',
      'text-background-opacity': 0,
      'text-margin-x': -5,
      'text-margin-y': 5
    }
  }
]
