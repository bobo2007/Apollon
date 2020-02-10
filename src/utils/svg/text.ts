import { ILayer } from '../../services/layouter/layer';

export class Text {
  static size = (
    layer: ILayer,
    value: string,
    styles?: Partial<CSSStyleDeclaration>,
  ): { width: number; height: number } => {
    const svg = layer.layer;
    if (!svg) {
      return { width: 0, height: 0 };
    }

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    Object.assign(text.style, {
      ...styles,
      visibility: 'visible',
    });
    text.appendChild(document.createTextNode(value));
    svg.appendChild(text);

    // TODO: here happens the error
    console.log(text.style);
    const bounds = text.getBBox();
    Object.assign(text.style, {
      visiblity: 'hidden',
    });
    svg.removeChild(text);
    return { width: bounds.width, height: bounds.height };
  };
}
