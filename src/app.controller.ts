import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AllCompanies,
  comapanyDetails,
  companies,
  companyDetails,
  controveryScore,
  coreCombinedScore,
  coreEsgRatings,
  coreTransitionScore,
  envThemeData,
  govThemeData,
  pillarScores,
  sectorRatingCompanies,
  socialThemeData,
  transitionScores,
} from './companies';
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

    return AllCompanies;
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

  // @Get('/nse-esg-api/all-esg-companies-score')
  // getCompaniesEsgRatings(): any {
  //   console.log('get company details request received');
  //   return companiesRatings;
  // }

  @Get('nse-esg-api/all-esg-companies-score')
  getAllCompanies() {
    return companies;
  }

  @Post('nse-esg-api/esgrating/company-details')
  companyDetails(@Body() body: any) {
    return companyDetails;
  }

  @Post('nse-esg-api/esgrating/esg-pillar-scores')
  pillarScores(@Body() body: any) {
    switch (body.scoreId) {
      case 1:
        return pillarScores;
      case 2:
        return transitionScores;
      case 3:
        return coreEsgRatings;
    }
  }

  @Post('nse-esg-api-esgrating/esg-theme-score')
  themes(@Body() body: any) {
    switch (body.pillarId) {
      case 1:
        return envThemeData;
      case 2:
        return socialThemeData;
      case 3:
        return govThemeData;
    }
  }

  @Post('nse-esg-api/esgrating/core-esg-ratings')
  corScore(@Body() body: any) {
    console.log(`Core esg ratings: `, body);
    switch (body.scoreId) {
      case 4:
        return coreTransitionScore;
      case 6:
        return coreCombinedScore;
      case 7:
        return controveryScore;
    }
  }

  @Post('nse-esg-api/esg-sector-score')
  sectorRatings(@Body() body: any) {
    console.log(`Sector Ratings :`, body);
    return sectorRatingCompanies;
  }
}
