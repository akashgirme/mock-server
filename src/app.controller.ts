import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { comapanyDetails, companies } from './companies';

@Controller('nse-esg-website')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('nse-esg-api/all-esg-companies')
  getHello(): any {
    console.log('get request received');
    return companies;
  }

  @Post('/nse-esg-api/pre-company-score')
  getCompanyDetails(): any {
    console.log('get company details request received');
    return comapanyDetails;
  }
}
