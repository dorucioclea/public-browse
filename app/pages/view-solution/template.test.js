import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../../test-utils/testHarness';

const template = 'pages/view-solution/template.njk';

describe('view solution', () => {
  it('should render back-link component with correct href', (done) => {
    const context = {};
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-page-back-link"]').length).toEqual(1);
        expect($('[data-test-id="view-solution-page-back-link"]').find('a').attr('href')).toEqual('./');
        done();
      });
  });

  it('should render the foundation tag if isFoundation is true', (done) => {
    const context = {
      isFoundation: true,
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-foundation-tag"]').length).toEqual(1);
        done();
      });
  });

  it('should not render the foundation tag if isFoundation is false', (done) => {
    const context = {
      isFoundation: false,
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="solution-foundation-tag"]').length).toEqual(0);
        done();
      });
  });

  it('should render the debug name', (done) => {
    const context = {
      supplierName: 'Really Kool Corporation',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const orgName = $('[data-test-id="view-solution-page-supplier-name"]');
        expect(orgName.length).toEqual(1);
        expect(orgName.text().trim()).toEqual(context.supplierName);
        done();
      });
  });

  it('should render the solution name', (done) => {
    const context = {
      name: 'Write on Time',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const solutionName = $('[data-test-id="view-solution-page-solution-name"]');
        expect(solutionName.length).toEqual(1);
        expect(solutionName.text().trim()).toEqual(context.name);
        done();
      });
  });

  it('should render the solution id', (done) => {
    const context = {
      id: '111',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const solutionId = $('[data-test-id="view-solution-page-solution-id"]');
        expect(solutionId.length).toEqual(1);
        expect(solutionId.text().trim()).toEqual(`Solution ID: ${context.id}`);
        done();
      });
  });

  it('should render the last updated', (done) => {
    const context = {
      lastUpdated: '2019-12-11T11:28:24.701Z',
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const lastUpdated = $('[data-test-id="view-solution-page-last-updated"]');
        expect(lastUpdated.length).toEqual(1);
        expect(lastUpdated.text().trim()).toEqual('Solution information last updated: 11 December 2019');
        done();
      });
  });

  it('should render the solution description section', (done) => {
    const context = {
      sections: {
        'solution-description': {},
      },
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-description"]').length).toEqual(1);
        done();
      });
  });

  it('should render the solution capabilities section', (done) => {
    const context = {
      sections: {
        capabilities: {},
      },
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(1);
        done();
      });
  });

  it('should render the learn more section', (done) => {
    const context = {
      sections: {
        capabilities: {},
      },
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="learn-more"]').length).toEqual(1);
        done();
      });
  });

  it('should render the solution contact details section', (done) => {
    const context = {
      sections: {
        'contact-details': {},
      },
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        expect($('[data-test-id="view-solution-contact-details"]').length).toEqual(1);
        done();
      });
  });

  it('should render the download more information button', (done) => {
    const context = {
      downloadSolutionUrl: '/path-to-blob',
      config: {
        blobstoreHost: 'www.some-blob-store.com',
      },
    };
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const moreInfoButton = $('[data-test-id="view-solution-page-download-info-button"] a');
        expect(moreInfoButton.length).toEqual(1);
        expect(moreInfoButton.text().trim()).toEqual('Download this PDF');
        expect(moreInfoButton.attr('href')).toEqual('www.some-blob-store.com/path-to-blob');
        done();
      });
  });
});
