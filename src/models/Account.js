export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
    this.bio = data.bio || null
    this.coverImg = data.coverImg || null
    this.graduated = data.graduated
    this.linkedin = data.linkedin || null
    this.github = data.github || null
    this.resume = data.resume || null
    this.class = data.class || null

  }
}
