import { Injectable } from '@angular/core';

interface ObjectLiteral {
  [key: string]: string;
}

interface ObjectStatusLiteral {
  [key: number]: string;
}

const messages: ObjectLiteral = {
  required: 'Required field',
  maxlength: ':field: must be at most :n: characters length.',
  minlength: ':field: must be at least :n: characters length.',
  max: ':field: must be at most :n:.',
  min: ':field: must be at least :n:.',
  digits: 'Only digits are allowed',
  email: 'Please enter a valid email address',
  emailRegistered: 'The email is already registered',
};

const firebaseMessages: ObjectLiteral = {
  'auth/network-request-failed': 'Network Error',
  'auth/network-request-fasiled': 'Something was wrong',
  'auth/email-already-in-use': 'Email already existing',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
};

const statusMessages: ObjectStatusLiteral = {
  200: 'The operations was successfully',
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  getFieldError(key: string): string {
    return messages[key] || key;
  }

  getMessageByFirebaseCode(code: string): string {
    return firebaseMessages[code] || code;
  }

  getMessageByStatusCode(code: number): string {
    return statusMessages[code] || code.toString();
  }
}
