/**
 * Interface for components.
 * @interface
 */
export interface IComponent {
  toHtml(): HTMLElement;
  destroy(): void;
}
