export class Auth {
  constructor(private username: string, private passowrd: string) {}

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.passowrd;
  }
}
