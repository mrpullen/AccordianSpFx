import { DROPDOWN_COMPONENT } from "../components/dropdown/Dropdown";

/**
 * ViewSelector component view
 */
export class PropertyPaneViewSelectorView {

  private _template: string = `
    <div class="view-selector-component">
      <${DROPDOWN_COMPONENT} params="options: lists, optionsCaption: listLabel, value: currentList"></${DROPDOWN_COMPONENT}>
     </div>
  `;

  /**
   * Renders the HTML markup
   */
  public render(element: HTMLElement): Promise<void> {
    return new Promise<void>((resolve) => {
      element.innerHTML += this._template;
      resolve();
    });
  }
}