export class Document {
    id: String;
    name: String;
    description: String;
    url: String;
    children: Array<any> = [];
  
    constructor (
      id: String,
      name: String,
      description: String,
      url: String,
      children: Array<any> = []
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.url = url;
      this.children = children;
    }
  }