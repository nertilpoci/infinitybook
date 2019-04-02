export class BoardElement{
    public id : string = this.randomId(100);
    public width : number= 200;
  public height : number= 200;
  public x : number= 0;
  public y : number= 0;

  randomId(length = 50) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
}