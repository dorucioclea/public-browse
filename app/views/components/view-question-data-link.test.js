import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './components/view-question-data-link.njk' import viewQuestionDataLink %}
                            {{ viewQuestionDataLink(questionData) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('view-question-link', () => {
  it('should render the link when provided', (done) => {
    const context = {
      questionData: 'www.somelink.com',
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-link"] a').text().trim()).toEqual('www.somelink.com');
        expect($('[data-test-id="view-question-data-link"] a').attr('href')).toEqual('www.somelink.com');

        done();
      });
  });

  it('should not render the data when not provided', (done) => {
    const context = {};

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-question-data-link"]').length).toEqual(0);

        done();
      });
  });
});
