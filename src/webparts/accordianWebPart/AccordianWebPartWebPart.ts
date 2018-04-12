import * as ko from "knockout";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart,  IPropertyPaneConfiguration,} from "@microsoft/sp-webpart-base";


import * as strings from "accordianWebPartStrings";
import AccordianWebPartViewModel, { IAccordianWebPartBindingContext } from "./AccordianWebPartViewModel";

import { IAccordianWebPartWebPartProps } from "./IAccordianWebPartWebPartProps";
import { PropertyPaneViewSelectorField } from "./controls/PropertyPaneViewSelector";


let _instance: number = 0;


export default class AccordianWebPartWebPart extends BaseClientSideWebPart<IAccordianWebPartWebPartProps> {
  private _id: number;
  private _componentElement: HTMLElement;
  private _koListId: KnockoutObservable<string> = ko.observable("");

  /**
   * Shouter is used to communicate between web part and view model.
   */
  private _shouter: KnockoutSubscribable<{}> = new ko.subscribable();

  /**
   * Initialize the web part.
   */
  protected onInit(): Promise<void> {
    this._id = _instance++;

    const tagName: string = `ComponentElement-${this._id}`;
    this._componentElement = this._createComponentElement(tagName);
    this._registerComponent(tagName);

    // when web part listId is changed, notify view model to update.
    this._koListId.subscribe((newValue: string) => {
      this._shouter.notifySubscribers(newValue, "listId");
    });

    const bindings: IAccordianWebPartBindingContext = {
      listId: this.properties.listId,
      shouter: this._shouter,
      context: this.context
    };

    ko.applyBindings(bindings, this._componentElement);

    return super.onInit();
  }

  public render(): void {
    if (!this.renderedOnce) {
      this.domElement.appendChild(this._componentElement);
    }
    if(this.properties.listId === undefined) {
     this._koListId("-1"); 
    }
    else {
      this._koListId(this.properties.listId);
    }
}

  private _createComponentElement(tagName: string): HTMLElement {
    const componentElement: HTMLElement = document.createElement("div");
    componentElement.setAttribute("data-bind", `component: { name: "${tagName}", params: $data }`);
    return componentElement;
  }

  private _registerComponent(tagName: string): void {
    ko.components.register(
      tagName,
      {
        viewModel: AccordianWebPartViewModel,
        template: require("./AccordianWebPart.template.html"),
        synchronous: false
      }
    );
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                  PropertyPaneViewSelectorField("accordionProps", {
                    context: this.context,
                    listId: this.properties.listId,
                    listLabel: strings.ListIdFieldLabel,
                    shouter: this._shouter
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
