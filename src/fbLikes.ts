export class LikeHandle{
  constructor(private initialCount: number){
  }
  async likeIncrease(){
    return this.initialCount += 1
  }
  async likeDecrease(){
    return this.initialCount -= 1
  }
}
