import { ISPList, IAccordionItem } from "../common/SPEntities";
export interface IDataHelper {

    getLists(): Promise<Array<ISPList>>;
    getItems(listId: string): Promise<Array<IAccordionItem>>;
}
