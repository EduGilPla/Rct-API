import { Brand } from "../brands/brands.enum";
import { DefiningTraits } from "./traits.attribute";

describe('Pruebas de DefiningTraits.create', () => {
  it('Todos los argumentos bien', () => {
    const brand = "ASUS"
    const model = "H510M-E"
    const price = 150
    const newTraits = DefiningTraits.create(brand, model, price)
    expect(newTraits.brand).toBe(Brand.ASUS)
    expect(newTraits.model).toBe("H510M-E")
    expect(newTraits.price).toBe(150)
  })
})