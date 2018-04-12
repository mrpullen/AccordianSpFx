/**
 * Represents SharePoint View object
 */

/**
 * Represents SharePoint List object
 */
export interface ISPList {
  Title: string;
  Id: string;
}

/**
 * Represents SharePoint REST service response for /_api/web/lists service call
 */


export interface IAccordionItem {
    Id: string;
    Title: string;
    Body: string;
    Link: string;
    Visible: boolean;
}