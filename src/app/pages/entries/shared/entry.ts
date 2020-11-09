import { BaseResourceModel } from "../../../shared/models/base.resource.model";
import { Category } from "../../categories/shared/category";

export class Entry implements BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public amount?: string,
    public type?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {
  }

  public fromJson<this>(jsonData: any): Entry {
    throw new Error("Method not implemented.");
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }


}
