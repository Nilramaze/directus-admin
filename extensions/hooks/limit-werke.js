export default function registerHook({ filter }) {
  filter('items.create.werke', async (input, { database }) => {
    const kuenstlerId = input.kuenstler_id;

    if (!kuenstlerId) return input;

    const [{ count }] = await database('werke')
      .where({ kuenstler_id: kuenstlerId })
      .count({ count: '*' });

    if (parseInt(count) >= 11) {
      throw new Error('Ein Künstler darf höchstens 11 Werke haben.');
    }

    return input;
  });
}
