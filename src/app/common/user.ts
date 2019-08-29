export class User {

    static fromObject(object: any): User {
      const user = Object.create(User.prototype);
      Object.assign(user, object);
      return user;
  }
  
      constructor(public id: number,
          public lastName: string,
          public firstName: string,
          public description: string,
          public age: number,
          public checked?: boolean
      ) {}
  
  }