export class ColonyRoleSet {
  'role': number;
  'userAddress': string;
  'domainId': string;

  static parse(data:any) {
    // const colonyRoleSet = Object.assign(new ColonyRoleSet(), data);
    const colonyRoleSet = new ColonyRoleSet();
    if (data.values) {
      colonyRoleSet.role = data.values.role;
      colonyRoleSet.userAddress = data.values.user;
      colonyRoleSet.domainId = data.values.domainId._hex;
    }

    return colonyRoleSet;
  }

  eventString() {
    // ${role} role assigned to user ${userAddress} in domain ${domainId}.
    return `${this.role} role assigned to user ${this.userAddress} in domain ${this.domainId}`;
  }
}
