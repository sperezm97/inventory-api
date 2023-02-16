import { Route, Get } from 'tsoa';

interface PingResponse {
  message: string;
}
@Route('ping')
export default class PingController {
  @Get('/')
  static async getMessage(): Promise<PingResponse> {
    return {
      message: 'pong',
    };
  }
}
