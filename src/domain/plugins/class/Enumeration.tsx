import React, { SFC } from 'react';
import Container from './../../Container';
import Element from '../../Element';

const HEADER_HEIGHT = 50;

class Enumeration extends Container {
  static isDroppable = false;
  
  constructor(public name: string = 'Enumeration') {
    super(name);
    this.bounds = { ...this.bounds, height: 100 };
  }

  addElement(newElement: Element, currentElements: Element[]): Element[] {
    let [parent, ...children] = super.addElement(newElement, currentElements);

    let y = HEADER_HEIGHT;
    for (const child of children) {
      child.bounds.y = y;
      y += child.bounds.height;
    }
    parent.bounds.height = y;
    return [parent, ...children];
  }

  removeElement(
    removedElement: Element,
    currentElements: Element[]
  ): Element[] {
    let [parent, ...children] = super.removeElement(
      removedElement,
      currentElements
    );

    let y = HEADER_HEIGHT;
    for (const child of children) {
      child.bounds.y = y;
      y += child.bounds.height;
    }
    parent.bounds.height = y;
    return [parent, ...children];
  }
}

export const EnumerationComponent: SFC<Props> = ({ element, children }) => (
  <g>
    <rect width="100%" height="100%" />
    <svg height={HEADER_HEIGHT}>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
        <tspan x="50%" dy={-8} textAnchor="middle" fontSize="85%">
          «enumeration»
        </tspan>
        <tspan x="50%" dy={18} textAnchor="middle">
          {element.name}
        </tspan>
      </text>
    </svg>
    {children}
    <rect
      width="100%"
      height="100%"
      stroke="black"
      fill="none"
      pointerEvents="none"
    />
    <path d={`M 0 ${HEADER_HEIGHT} H ${element.bounds.width}`} stroke="black" />
  </g>
);

interface Props {
  element: Enumeration;
}

export default Enumeration;
