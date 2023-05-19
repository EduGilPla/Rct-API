import { Column } from 'typeorm';
import { Brand } from '../brands/brands.enum';

export class DefiningTraits {
  @Column({ name: 'brand' })
  public brand: Brand;
  @Column({ name: 'model' })
  public model: string;
  @Column({
    name: 'price',
    type: 'decimal',
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    }
  })
  public price: number;

  private constructor(
    brand: Brand,
    model: string,
    price: number,
  ) {
    (this.brand = brand),
      (this.model = model),
      (this.price = price);
  }

  public static create(
    brand: string,
    model: string,
    price: number,
  ) {
    const castedToEnumBrand = <Brand>brand;
    return new DefiningTraits(
      castedToEnumBrand,
      model,
      price,
    );
  }
}
