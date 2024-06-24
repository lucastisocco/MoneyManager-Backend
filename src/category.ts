export class Category{

  constructor(
    public id: String,   //Cambie el tipo porque type number me daba error en api03
    public name: String,
    public description: String
  )
  {}
}