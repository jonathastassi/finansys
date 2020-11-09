export abstract class BaseResourceModel {
  id?: number;

  static fromJson(jsonData: any): any;
}
