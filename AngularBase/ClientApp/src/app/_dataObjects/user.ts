export class User {
  constructor() {
  }

  //Data Members
  Id: number;
  Username: string = '';
  Password: string = '';
  FirstName: string = '';
  LastName: string = '';
  Email: string = '';

  SecurityQuestionType1FK: number = null;
  SecurityQuestionType2FK: number = null;

  SecurityQuestionDescription1: string = '';
  SecurityQuestionDescription2: string = '';
  SecurityQuestionAnswer1: string = '';
  SecurityQuestionAnswer2: string = '';

  ActivationCode: string = '';

  //Properties
  NewPassword: string = '';
  ConfirmPassword: string = '';

  //Account Details
  AuthData?: string = '';
}
