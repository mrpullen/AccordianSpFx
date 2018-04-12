
import { ISPList } from "../common/SPEntities";
import { PropertyPaneViewSelectorModel } from "./PropertyPaneViewSelectorModel";
import * as ko from "knockout";
import {
  IPropertyPaneViewSelectorFieldPropsInternal
} from "./Common";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownOption } from "../components/dropdown/viewmodel";

/**
* ViewSelector component view model
*/
export class PropertyPaneViewSelectorViewModel {
  /**
   * Web part context
   */
  private _context: IWebPartContext;
  /**
   * Current List Id
   */
  private _listId: string;

  /**
   * ViewSelector component properties
   */
  private _properties: IPropertyPaneViewSelectorFieldPropsInternal;

  /**
   * MVVM model
   */
  private _model: PropertyPaneViewSelectorModel;
  /**
   * Observable collection of lists
   */
  protected lists: KnockoutObservableArray<IDropdownOption>;
  /**
   * Current selected list
   */
  protected currentList: KnockoutObservable<string>;
  /**
   * Flag if there is a list selection
   */
  protected noListSelection: KnockoutObservable<boolean>;
  /**
   * List dropdown lable
   */
  protected listLabel: string;
  /**
   * ctor
   */
  public constructor(_properties: IPropertyPaneViewSelectorFieldPropsInternal) {
    this._properties = _properties;
    this._context = _properties.context;
    this._listId = _properties.listId;
    this.listLabel = _properties.listLabel;

    this.currentList = ko.observable<string>(this._listId);
    this.noListSelection = ko.observable<boolean>(this._listId === "-1");

    // subscribing on changes in lists dropdown
    this.currentList.subscribe((value) => {
      this._listId = value;
      this.currentList(this._listId);
      this._properties.shouter.notifySubscribers(value, "listId");

    });

    this.lists = ko.observableArray<IDropdownOption>();

    this._model = new PropertyPaneViewSelectorModel(this._context);
  }



  /**
   * Initializes the view model
   */
  public init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this._model.getLists().then((lists) => {  // getting lists
        var listOptions = new Array<IDropdownOption>();
        lists.forEach((list: ISPList) => {
          listOptions.push({ value: list.Id, text: list.Title, selected: false });
        });
        this.lists(listOptions);
        resolve();
      });
    });
  }
}