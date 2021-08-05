export const effectEntry = (effect_entries) => {
  let results = effect_entries.filter((entry) => entry.language.name === "en");
  return results[0];
};
