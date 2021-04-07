/*
 * These are tests that are connected to a real world account over at https://cloud.beta.leasy.dev.
 * These tests are meant as smoke tests that the APIs are at leasy working. They are not
 * sophisticated unit tests.
 */
import { Client } from '../src';
import { NotFoundError } from '../src/errors';

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('Missing environment variable API_KEY!');
}
const client = new Client({ apiKey });

describe('categories', () => {
  describe('get()', () => {
    it('should return a single category with matching ID', async () => {
      const category = await client.categories.get('ac956c5f-4b83-4f3d-aeb2-56794788a7cc');
      expect(category.id).toBe('ac956c5f-4b83-4f3d-aeb2-56794788a7cc');
      expect(category.denomination).toBe('Test Category 1');
    });

    it('should throw if no category matches the ID', async () => {
      const promise = client.categories.get('aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa');
      await expect(promise).rejects.toThrow(NotFoundError);
    });
  });

  describe('all()', () => {
    it('should return a paginated result that contains all categories', async () => {
      const page = await client.categories.all();
      expect(page.hasNext).toBeFalsy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(2);
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: 'ac956c5f-4b83-4f3d-aeb2-56794788a7cc',
          denomination: 'Test Category 1',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '3a8a9963-4b65-4b14-9a5b-1790d29a131a',
          denomination: 'Test Category 2',
        }),
      );
    });

    it('should return pages of the configured size', async () => {
      const page = await client.categories.all({ pageSize: 1 });
      expect(page.hasNext).toBeTruthy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(1);
      if (!page.hasNext) {
        return fail('There should be another page here');
      }
      const nextPage = await page.next();
      expect(nextPage.nodes.length).toBe(1);
      return;
    });
  });
});

describe('models', () => {
  describe('get()', () => {
    it('should return a single model with matching ID', async () => {
      const model = await client.models.get('f2b3f427-63af-45f2-97fe-abbd59b54254');
      expect(model.id).toBe('f2b3f427-63af-45f2-97fe-abbd59b54254');
      expect(model.denomination).toBe('Test Model 1');
    });

    it('should throw if no model matches the ID', async () => {
      const promise = client.models.get('aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa');
      await expect(promise).rejects.toThrow(NotFoundError);
    });
  });

  describe('all()', () => {
    it('should return a paginated result that contains all models', async () => {
      const page = await client.models.all();
      expect(page.hasNext).toBeFalsy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(3);
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: 'f2b3f427-63af-45f2-97fe-abbd59b54254',
          denomination: 'Test Model 1',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '3b47c828-1bb3-492e-8527-91acdafe6665',
          denomination: 'Test Model 2',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '89609ef3-12f7-4d67-8de6-1631fd54ea5c',
          denomination: 'Test Model 3',
        }),
      );
    });
  });

  describe('byCategory()', () => {
    it('should return a paginated result that contains all models of a category', async () => {
      const page = await client.models.byCategory({
        categoryId: 'ac956c5f-4b83-4f3d-aeb2-56794788a7cc',
      });
      expect(page.hasNext).toBeFalsy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(2);
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: 'f2b3f427-63af-45f2-97fe-abbd59b54254',
          denomination: 'Test Model 1',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '3b47c828-1bb3-492e-8527-91acdafe6665',
          denomination: 'Test Model 2',
        }),
      );
    });

    it('should throw a NotFoundError if no category matches the provided ID.', async () => {
      const promise = client.models.byCategory({
        categoryId: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
      });
      await expect(promise).rejects.toThrow(NotFoundError);
    });
  });
});
