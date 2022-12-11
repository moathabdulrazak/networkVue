



export class Post {
  constructor(data) {
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.id = data.id
    this.likes = data.likes
    this.createdAt = data.createdAt
    this.body = data.body
    this.imgUrl = data.imgUrl || null

  }
}