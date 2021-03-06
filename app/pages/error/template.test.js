import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../../test-utils/testHarness';

const template = 'pages/error/template.njk';

describe('error page', () => {
  it('should render the error title', (done) => {
    const context = { message: 'an error message' };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const errorTitle = $('[data-test-id="error-page-title"]');
        expect(errorTitle.length).toEqual(1);
        expect(errorTitle.text().trim()).toEqual(`Error: ${context.message}`);
        done();
      });
  });

  it('should render a backLink to the home page', (done) => {
    const app = testHarness().createComponentDummyApp(template, {});
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageBackLink = $('[data-test-id="go-to-home-page-link"]');
        expect(homepageBackLink.length).toEqual(1);
        expect(homepageBackLink.text().trim()).toEqual('Go to Home Page');
        expect($(homepageBackLink).find('a').attr('href')).toEqual('/');
        done();
      });
  });

  it('should render a backLink to all solutions page', (done) => {
    const app = testHarness().createComponentDummyApp(template, {});
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageBackLink = $('[data-test-id="go-to-all-solutions-link"]');
        expect(homepageBackLink.length).toEqual(1);
        expect(homepageBackLink.text().trim()).toEqual('Go to All Solutions');
        expect($(homepageBackLink).find('a').attr('href')).toEqual('/solutions/all');
        done();
      });
  });

  it('should render a backLink to foundation solutions page', (done) => {
    const app = testHarness().createComponentDummyApp(template, {});
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const homepageBackLink = $('[data-test-id="go-to-foundation-solutions-link"]');
        expect(homepageBackLink.length).toEqual(1);
        expect(homepageBackLink.text().trim()).toEqual('Go to Foundation Solutions');
        expect($(homepageBackLink).find('a').attr('href')).toEqual('/solutions/foundation');
        done();
      });
  });
});
