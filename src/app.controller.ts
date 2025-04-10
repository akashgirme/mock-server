import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {
  comapanyDetails,
  companyDetails,
  controveryScore,
  coreCombinedScore,
  coreEsgRatings,
  coreTransitionScore,
  envThemeData,
  govThemeData,
  performanceEvolution,
  pillarDescriptionContent,
  pillarScores,
  sectorRatingCompanies,
  socialThemeData,
  transitionScores,
} from './companies';
import {
  ChangeLog,
  CompanyDetails,
  industryLeaders,
  IndustryRankAndScore,
  KeyDrivers,
  KeyFactors,
  PillarIndustryLeaders,
  PillarSummary,
  summary,
} from './rating-analytics';
import { companiesWithESGRatings } from './companies-with-esg-ratings';
import { companiesPreScore } from './companies-pre-score';
import { rawData } from './raw-data';

@Controller('nse-esg-website')
export class AppController {
  private token: string | null = null;
  constructor(private readonly appService: AppService) {}

  @Get('nse-esg-api/all-esg-companies')
  getHello(@Req() req): any {
    console.log('get request received');
    console.log('saved token, ', this.token);
    console.log('request token, ', req.headers['authorization']);

    return companiesPreScore;
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
  // }

  @Get('nse-esg-api/all-esg-companies-score')
  getAllCompanies() {
    return companiesWithESGRatings;
  }

  @Post('nse-esg-api/esgrating/company-details')
  companyDetails() {
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

  @Post('nse-esg-api/esgrating/theme-scores')
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

  @Post('nse-esg-api/esgrating/pillar-description')
  pillarDescription() {
    return pillarDescriptionContent;
  }

  @Post('nse-esg-api/esg-sector-score')
  sectorRatings(@Body() body: any) {
    console.log(`Sector Ratings :`, body);
    return sectorRatingCompanies;
  }

  @Post('rating-analytics/company-details')
  ratingCompanyDetails(@Body() body: any) {
    console.log(`Sector Ratings :`, body);
    return CompanyDetails;
  }

  @Post('rating-analytics/company-summary')
  summary() {
    return summary;
  }

  @Post('rating-analytics/industry-score-rank')
  rankAndScore() {
    return IndustryRankAndScore;
  }

  @Post('rating-analytics/industry-leaders')
  industryLeaders() {
    return industryLeaders;
  }

  @Post('rating-analytics/change-log')
  changeLog() {
    return ChangeLog;
  }

  @Post('rating-analytics/pillar-industry-leaders')
  pillarIndustryLeaders() {
    return PillarIndustryLeaders;
  }

  @Post('rating-analytics/pillar-summary')
  pillarSummary() {
    return PillarSummary;
  }

  @Post('rating-analytics/key-factors')
  keyFactors() {
    return KeyFactors;
  }

  @Post('rating-analytics/key-drivers')
  keyDrivers() {
    return KeyDrivers;
  }

  @Post('/rating-analytics/performance-evaluation')
  performanceEvolution() {
    return performanceEvolution;
  }

  @Post('/nse-esg-api/rawdata/raw-data-companies')
  rawData() {
    return rawData;
  }
}
