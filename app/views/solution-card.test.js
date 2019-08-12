import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../app';

const basicSolutionWithNoSectionsContext = {
  solution: {
    id: '00001',
    name: 'This is the title of the solution',
    sections: [
    ],
  },
};

const aSimpleSection = {
  name: 'Simple Section',
  value: 'This is the simple section',
  showTitle: true,
  columns: 1,
};

const aListSection = {
  name: 'List Section',
  value: [
    'value 1',
    'value 2',
    'value 3',
  ],
  showTitle: true,
  columns: 1,
};

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './solution-card.njk' import solutionCard %}
                          {{ solutionCard(solution) }}`;

    const a = nunjucks.renderString(macroWrapper, context);

    res.send(a);
  });

  app.use(dummyRouter);

  return app;
};


describe('solution-card', () => {
  it('should render the title of the Solution', (done) => {
    const dummyApp = createDummyApp(basicSolutionWithNoSectionsContext);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('.nhsuk-panel h3').text()).toEqual('YO This is the title of the solution');

        done();
      });
  });

  it('should render just the one section when provided', (done) => {
    const context = {
      solution: {
        ...basicSolutionWithNoSectionsContext.solution,
        sections: [aSimpleSection],
      },
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const section = $('[data-test-id="solution-sections"] > label');

        expect(section.length).toEqual(1);

        done();
      });
  });

  it('should render multiple sections that are provided in the context', (done) => {
    const context = {
      solution: {
        ...basicSolutionWithNoSectionsContext.solution,
        sections: [aSimpleSection, aListSection],
      },
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const section = $('[data-test-id="solution-sections"] > label');

        expect(section.length).toEqual(2);

        done();
      });
  });
});
