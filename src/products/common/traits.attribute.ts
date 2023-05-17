import { Column } from "typeorm"
import { Brand } from "../brands/brands.enum"

export class definingTraits {
  @Column({name: "brand"})
  private brand: Brand
  @Column({name: "model"})
  private model: string
  @Column({
    name: "price",
    type: "decimal"
  })
  private price: number

  private constructor(brand: Brand, model: string, price: number) {
    this.brand = brand,
    this.model = model,
    this.price = price
  }

  public create(brand: Brand, model: string, price: number){
    return new definingTraits(brand,model,price);
  }
}