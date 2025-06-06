module.exports = {
  'Kuenstler.items.update': async function (event, { services }) {
        console.log("HOOK GETRIGGERT:", JSON.stringify(event, null, 2));
    const { payload, key } = event;
    if (!payload) throw new Error("Kein Payload");

    const werke = payload.werke?.create ?? [];

    if (werke.length > 11) {
      throw new Error("Maximal 11 Werke pro Künstler erlaubt!");
    }
  }
};
