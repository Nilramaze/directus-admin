module.exports = function registerHook({ services }) {
  const { ItemsService } = services;

  return {
    'Kuenstler.items.update': async function (input, { schema }) {
      console.log('✅ HOOK wurde ausgeführt');

      const kuenstlerId = input.keys?.[0];
      const neueWerke = input.payload?.werke?.create || [];

      if (!kuenstlerId) {
        console.warn('⚠️ Keine Künstler-ID gefunden.');
        return;
      }

      const werkeService = new ItemsService('Werk', { schema }); // ← Collection-Name exakt: Werk

      const vorhandeneWerke = await werkeService.readByQuery({
        filter: { kuenstler_id: { _eq: kuenstlerId } }, // ← Passe das Feld ggf. an
        fields: ['id'],
        limit: -1
      });

      const gesamt = vorhandeneWerke.length + neueWerke.length;

      console.log(`🎨 Gesamtanzahl Werke: ${gesamt}`);

      if (gesamt > 11) {
        throw new Error('❌ Maximal 11 Werke pro Künstler erlaubt!');
      }
    }
  };
};
