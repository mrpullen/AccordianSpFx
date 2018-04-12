import { IWebPartContext, IPropertyPaneCustomFieldProps } from "@microsoft/sp-webpart-base";
//import * as ko from "knockout";
/**
 * Complex object to define property in a web part
 */
export interface IPropertyPaneViewSelectorProps {
  /**
   * Selected list id
   */
  listId: string;
}

/**
 * PropertyPaneViewSelector component public props
 */
export interface IPropertyPaneViewSelectorFieldProps {

  context: IWebPartContext;
  /**
   * selected list id
   */
  listId: string;
 /**
   * Label to show in list dropdown
   */
  listLabel: string;
  
  shouter: KnockoutSubscribable<{}>;
}

/**
 * PropertyPaneViewSelector component internal props
 */
export interface IPropertyPaneViewSelectorFieldPropsInternal extends IPropertyPaneCustomFieldProps {
  /**
   * Path to target property in web part properties
   */
  targetProperty: string;
  
  context: IWebPartContext;
  /**
   * selected list id
   */
  listId: string;
  /**
   * Label to show in list dropdown
   */
  listLabel: string;

  shouter: KnockoutSubscribable<{}>;
}