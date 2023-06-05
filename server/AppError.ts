export default class AppError extends Error {
  constructor(public code: number, message: string) {
    super();
    this.message = message;
  }
}
