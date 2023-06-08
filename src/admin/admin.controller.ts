import { Controller, Get, HostParam } from '@nestjs/common';

//To test host use localhost:3000/admin
//set header Host to mateusz.example.com
@Controller({ host: ':account.example.com', path: 'admin' })
export class AdminController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
