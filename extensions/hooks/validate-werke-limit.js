module.exports = function registerHook({ services }) {
  const { ItemsService } = services;

  return {
    'kuenstler.items.update': async function (input, { schema }) {
      const kuenstlerId = input.keys?.[0];
      const neueWerke = input.payload?.werke?.create || [];

      if (!kuenstlerId) return;

      const werkeService = new ItemsService('werke', { schema });

      const vorhandeneWerke = await werkeService.readByQuery({
        filter: { kuenstler: { _eq: kuenstlerId } },
        fields: ['id'],
        limit: -1 // hole alle Werke
      });

      const gesamt = vorhandeneWerke.length + neueWerke.length;

      if (gesamt > 11) {
        throw new Error("Maximal 11 Werke pro Künstler erlaubt!");
      }
    }
  };
};
