import request from 'supertest';
import cheerio from 'cheerio';
import { testHarness } from '../test-utils/testHarness';
import content from './manifest.json';

const template = 'guide/template.njk';

describe('guide', () => {
  it('should render the guide title, description and subtext', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const title = $('[data-test-id="guide-page-title"]');
        const description = $('[data-test-id="guide-page-description"]');
        const subtext = $('[data-test-id="guide-page-subtext"] > div');
        expect(title.length).toEqual(1);
        expect(title.text().trim()).toEqual(content.title);
        expect(description.length).toEqual(1);
        expect(description.text().trim()).toEqual(content.description);
        content.subtext.map((subtextEntry, i) => {
          expect(subtext.find(`div:nth-child(${i + 1})`).text().trim()).toEqual(subtextEntry);
        });
        done();
      });
  });

  it('should render a title, description and subsection for each section', (done) => {
    const context = content;
    const app = testHarness().createComponentDummyApp(template, context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const title = $('[data-test-id="guide-section-title"]');
        const description = $('[data-test-id="guide-section-description"]');
        const subsection = $('[data-test-id="guide-section-subsection"]');
        expect(title.length).toEqual(content.sections.length);
        expect(description.length).toEqual(content.sections.length);
        expect(subsection.length).toEqual(content.sections.length);
        content.sections.map((section, i) => {
          expect(title[i].children[0].data).toEqual(section.title);
          expect(description[i].children[0].data).toEqual(section.description);
        });
        done();
      });
  });
});
