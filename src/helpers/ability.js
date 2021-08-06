export const effectEntry = (effect_entries) => {
  let results = effect_entries.filter((entry) => entry.language.name === "en");
  return results[0];
};

export const flavorTextEntry = (flavor_text_entries, generation) => {
  let results = flavor_text_entries.filter(
    (flavor_text) =>
      flavor_text.version_group.name === generation &&
      flavor_text.language.name === "en"
  );
  return results[0];
};
