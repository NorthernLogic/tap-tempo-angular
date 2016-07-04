import { TapTempoPage } from './app.po';

describe('tap-tempo App', function() {
  let page: TapTempoPage;

  beforeEach(() => {
    page = new TapTempoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
