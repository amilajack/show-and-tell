const { getRandomArticle: api } = require('../src/api');

describe('basic', () => {
  it('should fetch random articles', async () => {
    const [res] = await api();
    expect(res).toEqual({
      images: expect.any(Array),
      ns: expect.any(Number),
      title: expect.any(String),
      pageid: expect.any(Number),
      revisions: expect.any(Array)
    });
  });
});
