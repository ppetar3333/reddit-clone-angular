export class Token {
  constructor(
    public username: string,
    public role: string,
    public createdAt: number,
    public expAt: number
  ) {}
}
