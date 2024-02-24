export interface User {
  name: string;
  password: string;
}

export interface UserState extends User {
  wins: number;
  id: number;
}

export type UserDBType = InstanceType<typeof UsersDB>;

export default class UsersDB {
  private initialState: UserState[];

  constructor() {
    this.initialState = [];
  }

  authUser(user: User) {
    if (this.getPlayerByLogin(user.name)) {
      const index = this.indexPlayerByLoginAndPassword(user);

      if (index === -1) {
        return {
          name: user.name,
          index: index,
          error: true,
          errorText: "Invalid user login or password!",
        };
      }

      return {
        name: this.initialState[index].name,
        index: this.initialState[index].id,
        error: false,
        errorText: "",
      };
    }

    const indexNewUser = this.initialState.push({
      name: user.name,
      password: user.password,
      id: this.generateUniqueId(user.name || ""),
      wins: 0,
    });
    return {
      name: this.initialState[indexNewUser - 1].name,
      index: this.initialState[indexNewUser - 1].id,
      error: false,
      errorText: "",
    };
  }

  addWinByUserIndex(userIndex: number) {
    const user = this.getPlayerByIndex(userIndex);

    if (user) {
      user.wins += 1;
    }
  }

  getPlayerByIndex(id: number) {
    return this.initialState.find((userState) => userState.id === id);
  }

  getPlayerByLogin(name: string) {
    return this.initialState.find((userState) => userState.name === name);
  }

  indexPlayerByLoginAndPassword(user: User) {
    return this.initialState.findIndex(
      (userState) =>
        userState.name === user.name && userState.password === user.password
    );
  }

  getAllUsers() {
    return this.initialState;
  }

  private generateUniqueId(value: string) {
    const uniqueId =
      Date.now() + Math.trunc(Math.random() * 1000000) * value.length;
    return uniqueId;
  }
}
