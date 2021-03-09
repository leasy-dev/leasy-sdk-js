# Leasy JS SDK

This library implements helpers to interact with the Leasy API without any knowledge about the API itself.
It comes with TypeScript types and comprehensive JSDoc comments to integrate nicely with your IDE of choice.

## Installation

Install the Leasy JavaScript SDK with `npm` or `yarn`:

```bash
$ npm install leasy
# or
$ yarn add leasy
```

## Usage

To be able to connect to Leasy, you will have to create an API key. Currently the SDK supports operations that need at most `WRITE` permissions.
If you use this SDK in the frontend, the default should be, to only use the `READ` permission level and do the booking operations in the backend, unless you want your users be able to freely make bookings.
After you created a key, you can pass it to a new Leasy Client instance:

```ts
import { Client } from 'leasy';

const leasy = new Client({ apiKey: '<YOUR_API_KEY_HERE>' });
```

## Example

```ts
import { Client } from 'leasy';

const leasy = new Client({ apiKey: '<YOUR_API_KEY_HERE>' });

const test = async () => {
  const modelId = '<SOME_MODEL_ID>';

  const slots = await leasy.timeSlots.byModel({
    modelId,
    filter: { after: new Date().toISOString() },
  });

  const nextAvailableSlot = slots.nodes.find(slot => slot && slot.available);

  if (nextAvailableSlot) {
    const reservation = await leasy.reservations.create({
      modelId,
      start: nextAvailableSlot.startTime,
      end: nextAvailableSlot.endTime,
    });

    await leasy.reservations.update(reservation.id, reservation => [reservation.complete()]);
  }
};
```
