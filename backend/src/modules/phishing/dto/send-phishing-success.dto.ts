export class SendPhishingResponseSuccessDto {
  success: boolean;
  // data: T;
  message?: string;

  constructor(message?: string) {
    this.success = true;
    // this.data = data;
    this.message = message || 'Request successful';
  }
}
