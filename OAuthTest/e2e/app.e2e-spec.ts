import { OAuthTestPage } from './app.po';

describe('oauth-test App', function() {
  let page: OAuthTestPage;

  beforeEach(() => {
    page = new OAuthTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
