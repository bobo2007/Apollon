import { CommonElementType } from '..';
import { Container } from '../../../services/container/container';
import { Element } from '../../../services/element/element';
import { computeBoundingBoxForElements } from '../../../utils/geometry/boundary';

export class Package extends Container {
  static features = {
    ...Container.features,
    connectable: false,
    editable: false,
  };

  type = CommonElementType.Package;

  render(elements: Element[]): Element[] {
    const [parent, ...children] = super.render(elements);
    const absoluteChildren: Element[] = children.map<Element>(child => {
      child.bounds.x += parent.bounds.x;
      child.bounds.y += parent.bounds.y;
      return child;
    });
    const bounds = computeBoundingBoxForElements([parent, ...absoluteChildren]);
    const relativeChildren: Element[] = absoluteChildren.map<Element>(child => {
      child.bounds.x -= parent.bounds.x;
      child.bounds.y -= parent.bounds.y;
      return child;
    });
    const deltaX = bounds.x - parent.bounds.x;
    const deltaY = bounds.y - parent.bounds.y;
    relativeChildren.forEach(child => {
      child.bounds.x -= deltaX;
      child.bounds.y -= deltaY;
    });
    const resizedParent = new Package({ ...parent, bounds });
    return [resizedParent, ...relativeChildren];
  }

  addElement(newElement: Element, currentElements: Element[]): Element[] {
    const [_, ...children] = super.addElement(newElement, currentElements);
    return this.render(children);
  }

  removeElement(removedElement: string, currentElements: Element[]): Element[] {
    const [_, ...children] = super.removeElement(removedElement, currentElements);
    return this.render(children);
  }
}
