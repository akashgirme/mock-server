import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { comapanyDetails, companies } from './companies';
import { companiesRatings } from './rating';

@Controller('nse-esg-website')
export class AppController {
  private token: string | null = null;
  constructor(private readonly appService: AppService) {}

  @Get('nse-esg-api/all-esg-companies')
  getHello(@Req() req): any {
    console.log('get request received');
    console.log('saved token, ', this.token);
    console.log('request token, ', req.headers['authorization']);

    return companies;
  }

  @Post('nse-esg-api/generateToken')
  generateToken(@Body() body: { username: string; password: string }): any {
    console.log('auth request received, payload, ', body);
    const username = body.username;
    const password = body.password;

    const token =
      'Bearer ' + Buffer.from(username + ':' + password).toString('base64');

    this.token = token;
    console.log('token, ', token);
    return {
      token: Buffer.from(username + ':' + ':' + password).toString('base64'),
    };
  }

  @Get('/nse-esg-api/pre-company-score/:companyId')
  getCompanyDetails(): any {
    console.log('get company details request received');
    return comapanyDetails;
  }

  @Get('/nse-esg-api/all-esg-companies-score')
  getCompaniesEsgRatings(): any {
    console.log('get company details request received');
    return companiesRatings;
  }
}
