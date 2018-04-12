import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { ISPList, IAccordionItem } from "../common/SPEntities";
import { IDataHelper } from "./DataHelperBase";
import pnp, { Logger, LogLevel, ConsoleListener } from "sp-pnp-js";
/**
 * List with views interface
 */

/**
 * SharePoint Data Helper class.
 * Gets information from current web
 */
export class DataHelperSP implements IDataHelper {
  /**
   * ctor
   */
  public constructor(context: IWebPartContext) {

    pnp.setup({
        spfxContext: context
      });

      // optional, we are setting up the sp-pnp-js logging for debugging
      Logger.activeLogLevel = LogLevel.Info;
      Logger.subscribe(new ConsoleListener());
  }

  /**
   * API to get lists from the source
   */
  public getLists(): Promise<ISPList[]> {
      return pnp.sp.web.lists.select("Id","Title").getAs<Array<ISPList>>();
  }

  public getItems(listId: string): Promise<Array<IAccordionItem>> {
    return pnp.sp.web.lists.getById(listId).items.select("Id","Title","Body").getAs<Array<IAccordionItem>>();
  }

}