
import { IDataHelper } from "../data-helpers/DataHelperBase";
import { DataHelpersFactory } from "../data-helpers/DataHelpersFactory";
import { ISPList } from "../common/SPEntities";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

/**
 * ViewSelector component model
 */
export class PropertyPaneViewSelectorModel {
  /**
   * data helper
   */
  private _dataHelper: IDataHelper;

  /**
   * ctor
   */
  constructor(_context: IWebPartContext) {
    this._dataHelper = DataHelpersFactory.createDataHelper(_context);
  }

  /**
   * Get lists collection
   */
  public getLists(): Promise<ISPList[]> {
    return this._dataHelper.getLists();
  }

}