export const lvlUpMoves = (moves, generation) => {
  let results = moves.filter((move) =>
    move.version_group_details.some(
      (r) =>
        r.move_learn_method.name === "level-up" &&
        r.version_group.name === generation
    )
  );
  return results;
};

export const machineMoves = (moves, generation) => {
  let results = moves.filter((gen) =>
    gen.version_group_details.some(
      (r) =>
        r.version_group.name === generation &&
        r.move_learn_method.name === "machine"
    )
  );
  return results;
};
