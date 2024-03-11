export interface ReCaptchaResponse {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    errorcodes: string[];
  };
  