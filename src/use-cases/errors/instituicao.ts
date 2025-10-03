export class CnpjAlreadyInUseError extends Error {
  constructor() {
    super("Cnpj já está em uso.");
    this.name = "CnpjAlreadyInUseError";
  }
}

export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("Email já está em uso.");
    this.name = "EmailAlreadyInUseError";
  }
}
