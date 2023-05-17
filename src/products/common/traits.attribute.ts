import { Column } from "typeorm"
import { Brand } from "../brands/brands.enum"

export class definingTraits {
  @Column({name: "brand"})
  public brand: Brand
  @Column({name: "model"})
  public model: string
  @Column({
    name: "price",
    type: "decimal"
  })
  public price: number

  private constructor(brand: Brand, model: string, price: number) {
    this.brand = brand,
    this.model = model,
    this.price = price
  }

  public static create(brand: Brand, model: string, price: number){
    return new definingTraits(brand,model,price);
  }
}