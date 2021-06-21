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

describe('resources', () => {
  describe('get()', () => {
    it('should return a single category with matching ID', async () => {
      const category = await client.resources.get('815d0582-bfd9-41ee-8cd7-a050dca99272');
      expect(category.id).toBe('815d0582-bfd9-41ee-8cd7-a050dca99272');
      expect(category.denomination).toBe('Test Resource 1');
    });

    it('should throw if no category matches the ID', async () => {
      const promise = client.resources.get('aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa');
      await expect(promise).rejects.toThrow(NotFoundError);
    });
  });

  describe('all()', () => {
    it('should return a paginated result that contains all categories', async () => {
      const page = await client.resources.all();
      expect(page.hasNext).toBeFalsy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(2);
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '815d0582-bfd9-41ee-8cd7-a050dca99272',
          denomination: 'Test Resource 1',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '2fc228a1-7e3d-430e-9695-dc16af76a9eb',
          denomination: 'Test Resource 2',
        }),
      );
    });

    it('should return pages of the configured size', async () => {
      const page = await client.resources.all({ pageSize: 1 });
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

describe('calendars', () => {
  describe('get()', () => {
    it('should return a single model with matching ID', async () => {
      const model = await client.calendars.get('a8b8f932-3a63-4096-afe7-5e3820bd01b7');
      expect(model.id).toBe('a8b8f932-3a63-4096-afe7-5e3820bd01b7');
      expect(model.denomination).toBe('Test Calendar 1');
    });

    it('should throw if no model matches the ID', async () => {
      const promise = client.calendars.get('aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa');
      await expect(promise).rejects.toThrow(NotFoundError);
    });
  });

  describe('all()', () => {
    it('should return a paginated result that contains all calendars', async () => {
      const page = await client.calendars.all();
      expect(page.hasNext).toBeFalsy();
      expect(page.hasPrevious).toBeFalsy();
      expect(page.nodes.length).toBe(2);
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: 'a8b8f932-3a63-4096-afe7-5e3820bd01b7',
          denomination: 'Test Calendar 1',
        }),
      );
      expect(page.nodes).toContainEqual(
        expect.objectContaining({
          id: '3992cb3e-3f22-408e-bbb5-27adbf4dcf66',
          denomination: 'Test Calendar 2',
        }),
      );
    });
  });

  // describe('byCategory()', () => {
  //   it('should return a paginated result that contains all models of a category', async () => {
  //     const page = await client.models.byCategory({
  //       categoryId: 'ac956c5f-4b83-4f3d-aeb2-56794788a7cc',
  //     });
  //     expect(page.hasNext).toBeFalsy();
  //     expect(page.hasPrevious).toBeFalsy();
  //     expect(page.nodes.length).toBe(2);
  //     expect(page.nodes).toContainEqual(
  //       expect.objectContaining({
  //         id: 'f2b3f427-63af-45f2-97fe-abbd59b54254',
  //         denomination: 'Test Model 1',
  //       }),
  //     );
  //     expect(page.nodes).toContainEqual(
  //       expect.objectContaining({
  //         id: '3b47c828-1bb3-492e-8527-91acdafe6665',
  //         denomination: 'Test Model 2',
  //       }),
  //     );
  //   });

  //   it('should throw a NotFoundError if no category matches the provided ID.', async () => {
  //     const promise = client.models.byCategory({
  //       categoryId: 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
  //     });
  //     await expect(promise).rejects.toThrow(NotFoundError);
  //   });
  // });
});

describe('timeSlots', () => {
  it('returns time slots for a resource', async () => {
    const slots = await client.timeSlots.byResource({
      resourceId: '815d0582-bfd9-41ee-8cd7-a050dca99272',
      filter: { available: true },
    });

    expect(slots.nodes.length).toBe(3);
  });
});
