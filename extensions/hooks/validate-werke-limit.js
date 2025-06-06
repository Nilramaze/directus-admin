module.exports = function registerHook({ services }) {
  const { ItemsService } = services;
  consolest.log('Registering validate-werke-limit hook');

  async function checkWerkeLimit(kuenstlerId, zusatz = 0, schema) {
    const werkService = new ItemsService('Werk', { schema });

    const vorhandene = await werkService.readByQuery({
      filter: { kuenstler_id: { _eq: kuenstlerId } },
      fields: ['id'],
      limit: -1
    });

    const gesamt = vorhandene.length + zusatz;

    if (gesamt > 11) {
      throw new Error(`❌ Maximal 11 Werke pro Künstler erlaubt! Aktuell wären es: ${gesamt}`);
    }
  }

  return {
    'Kuenstler.items.update': async (event, { schema }) => {
      const kuenstlerId = event.keys?.[0];
      const neueWerke = event.payload?.werke?.create || [];

      if (kuenstlerId) {
        await checkWerkeLimit(kuenstlerId, neueWerke.length, schema);
      }
    },

    'Werk.items.create': async (event, { schema }) => {
      const kuenstlerId = event.payload?.kuenstler_id;

      if (kuenstlerId) {
        await checkWerkeLimit(kuenstlerId, 1, schema);
      }
    }
  };
};
