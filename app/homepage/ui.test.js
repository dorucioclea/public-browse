import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/');
};

fixture('Show Home Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render the homepage hero', async (t) => {
  await pageSetup(t);
  const homepageSection = Selector('[data-test-id="homepage-hero"] > section');
  const title = homepageSection.find('h1');
  const description = homepageSection.find('p');

  await t
    .expect(homepageSection.count).eql(1)
    .expect(title.innerText).eql(content.heroHeading)
    .expect(description.innerText).eql(content.heroText);
});

test('should render the about us section', async (t) => {
  await pageSetup(t);
  const aboutUsSection = Selector('[data-test-id="about-us"]');
  await t
    .expect(aboutUsSection.find('h3').innerText).eql(content.title)
    .expect(aboutUsSection.find('p').innerText).eql(content.description[0])
    .expect(aboutUsSection.find('p').nth(1).innerText).eql(content.description[1])
    .expect(aboutUsSection.find('p').nth(2).innerText).eql(content.description[2]);
});

test('should render the guidance promo', async (t) => {
  await pageSetup(t);
  const guidancePromo = Selector('[data-test-id="guidance-promo"]');
  await t
    .expect(guidancePromo.count).eql(1)
    .expect(guidancePromo.find('h3').innerText).eql(content.guidePromoHeading)
    .expect(guidancePromo.find('p').innerText).eql(content.guidePromoDescription);
});

test('should render the browse promo', async (t) => {
  await pageSetup(t);
  const browsePromo = Selector('[data-test-id="browse-promo"]');
  await t
    .expect(browsePromo.count).eql(1)
    .expect(browsePromo.find('h3').innerText).eql(content.viewSolutionsPromoHeading)
    .expect(browsePromo.find('p').innerText).eql(content.viewSolutionsPromoDescription);
});

test('should navigate to the browse solution page when clicking on the browse promo', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const browsePromoLink = Selector('[data-test-id="browse-promo"] a');
  await t
    .expect(browsePromoLink.exists).ok()
    .click(browsePromoLink)
    .expect(getLocation()).contains('/solutions');
});

fixture('Footer')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });


test('should navigate guide page', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const buyersGuideLink = Selector('[data-test-id="footer-component"] li:nth-child(1) > a');
  await t
    .expect(buyersGuideLink.exists).ok()
    .click(buyersGuideLink)
    .expect(getLocation()).contains('/guide');
});

test('should navigate guide page contact us section', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const guideContactUsLink = Selector('[data-test-id="footer-component"] li:nth-child(2) > a');
  await t
    .expect(guideContactUsLink.exists).ok()
    .click(guideContactUsLink)
    .expect(getLocation()).contains('/guide#contact-us');
});

test('should navigate nhs digital page', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const nhsDigitalLink = Selector('[data-test-id="footer-component"] li:nth-child(3) > a');
  await t
    .expect(nhsDigitalLink.exists).ok()
    .click(nhsDigitalLink)
    .expect(getLocation()).contains('https://digital.nhs.uk/');
});

test('should navigate to about GPIT futures page', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const aboutGpitLink = Selector('[data-test-id="footer-component"] li:nth-child(4) > a');
  await t
    .expect(aboutGpitLink.exists).ok()
    .click(aboutGpitLink)
    .expect(getLocation()).contains('https://digital.nhs.uk/services/future-gp-it-systems-and-services');
});

test('should navigate to about GPIT futures page', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const cookiesLink = Selector('[data-test-id="legal-panel"] span:nth-child(2) > a');
  await t
    .expect(cookiesLink.exists).ok()
    .click(cookiesLink)
    .expect(getLocation()).contains('https://digital.nhs.uk/about-nhs-digital/privacy-and-cookies');
});

test('should show legal banner', async (t) => {
  await pageSetup(t);
  const legalText = Selector('[data-test-id="legal-panel"] span:nth-child(1)');
  await t
    .expect(legalText.innerText).eql('Legal');
});

fixture('Header')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display BETA banner', async (t) => {
  await pageSetup(t);
  const legalText = Selector('[data-test-id="terms-banner"] > div > div > div:nth-child(1)');
  await t
    .expect(legalText.innerText).eql('BETA');
});

test('should display General Terms of Use text', async (t) => {
  await pageSetup(t);
  const termsOfUseText = Selector('[data-test-id="terms-banner"] > div > div > div:nth-child(2)');
  await t
    .expect(termsOfUseText.innerText).eql('By using this site you are accepting the General Terms \
      of Use which you can view by downloading this PDF. The Cookies Policy and Privacy Policy can be \
      accessed using the links at the bottom of the page.');
});

test('should navigate to home page header banner', async (t) => {
  await t.navigateTo('http://localhost:1234/guide');
  const getLocation = ClientFunction(() => document.location.href);
  const headerBannerLink = Selector('[data-test-id="header-banner"] a');
  await t
    .expect(headerBannerLink.exists).ok()
    .click(headerBannerLink)
    .expect(getLocation()).eql('http://localhost:1234/');
});
