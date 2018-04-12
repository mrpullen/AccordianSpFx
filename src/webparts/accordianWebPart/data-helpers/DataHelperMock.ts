import { ISPList, IAccordionItem } from "../common/SPEntities";
import { IDataHelper } from "./DataHelperBase";

/**
 * MOCK data helper. Gets data from hardcoded values
 */
export class DataHelperMock implements IDataHelper {
  /**
   * hardcoded collection of lists
   */
  private static _lists: ISPList[] = [
      { Title: "Announcements 1", Id: "1" },
      { Title: "Announcements 2", Id: "2" },
      { Title: "Announcements 3", Id: "3" }];
  /**
   * hardcoded collection of views
   */
  private static _listItems: Array<IAccordionItem> = [
      {
            Id: "1",
            Title: "Question 1",
            Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id venenatis risus.",
            Link:"#",
            Visible: false
        },
        {
            Id: "2",
            Title: "Question 2",
            Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada aliquam elit.",
            Link:"#",
            Visible: false
        },
        {
            Id: "3",
            Title: "Question 3",
            Body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu lorem vitae.",
            Link:"#",
            Visible: false
        }];

  /**
   * API to get lists from the source
   */
  public getLists(): Promise<ISPList[]> {
    return new Promise<ISPList[]>((resolve) => {
      resolve(DataHelperMock._lists); // returning all the lists
    });
  }

public getItems(listId: string): Promise<Array<IAccordionItem>> {
    return new Promise<Array<IAccordionItem>>((resolve) => {
        resolve(DataHelperMock._listItems);
    });
  }
}