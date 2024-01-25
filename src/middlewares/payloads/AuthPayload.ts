import { Length, validateSync } from 'class-validator';
import { Request } from 'express';

export class AuthPayload {
  @Length(1)
  public readonly name?: string;

  @Length(1)
  public readonly password?: string;

  private errors: string[];

  public constructor(req: Request) {
    this.errors = ['unvalidated'];

    const { headers } = req;
    this.name         = headers.name ? `${headers.name}` : '';
    this.password     = headers.password ? `${headers.password}` : '';

    this.validate();
  }

  public isValid(): boolean {
    return !this.errors.length;
  }

  public validate(): void {
    this.errors = [];

    validateSync(this).forEach((error) => {
      this.errors.push(error.toString(true));
    });
  }
}
