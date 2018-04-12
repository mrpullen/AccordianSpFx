import * as ko from "knockout";
import styles from "./AccordianWebPart.module.scss";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IAccordianWebPartWebPartProps } from "./IAccordianWebPartWebPartProps";
import { IAccordionItem } from "./common/SPEntities";
import { DataHelpersFactory } from "./data-helpers/DataHelpersFactory";
import { IDataHelper } from "./data-helpers/DataHelperBase";


export interface IAccordianWebPartBindingContext extends IAccordianWebPartWebPartProps {
  shouter: KnockoutSubscribable<{}>;
  listId: string;
  context: IWebPartContext;
}



export default class AccordianWebPartViewModel {
  public items: KnockoutObservableArray<IAccordionItem> = ko.observableArray<IAccordionItem>([]);
  public currentItem: KnockoutObservable<string> = ko.observable<string>("0");
  public listId: KnockoutObservable<string> = ko.observable<string>();
  public isVisible: KnockoutComputed<boolean>;
  public labelClass: string = styles.label;
  public accordianWebPartClass: string = styles.accordianWebPart;
  public containerClass: string = styles.container;
  public rowClass: string = `ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`;
  public buttonClass: string = `ms-Button ${styles.button}`;
  // public accordionClass: string = `${styles.accordion}`;

  private repo: IDataHelper;

  selectItem(item: IAccordionItem, evt:MouseEvent): void {
    if(this.currentItem() === item.Id) {
      this.currentItem("0");
    }
    else {
      this.currentItem(item.Id);
    }
  }

  constructor(bindings: IAccordianWebPartBindingContext) {

    this.repo = DataHelpersFactory.createDataHelper(bindings.context);
    this.listId(bindings.listId);
    // when web part description is updated, change this view model"s description.
    bindings.shouter.subscribe((value: string) => {
        this.listId(value);
        // update the data bound into the accordion.
        this.getItems(value);
      }, this, "listId");
      this.getItems(bindings.listId);

      this.selectItem = this.selectItem.bind(this);


  }

  private getItems(listId: string) {
    if(listId !== "-1") {
      this.repo.getItems(ko.unwrap(this.listId)).then(items => {
        this.items(items);
      });
    }
  }

 
}
