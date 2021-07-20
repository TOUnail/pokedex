import { useState, useEffect } from "react";
import Move from "./Move";
import { lvlUpMoves, machineMoves } from "../../helpers/learnset";
const Moves = ({ moves }) => {
  const [lvlMoves, setLvlMoves] = useState([]);
  const [machMoves, setMachMoves] = useState([]);
  const [generation, setGeneration] = useState("sun-moon");
  useEffect(() => {
    setLvlMoves(lvlUpMoves(moves, generation));
    setMachMoves(machineMoves(moves, generation));
  }, [moves, generation]);
  // console.log(machMoves);
  return (
    <div className="row row-cols-1 row-cols-lg-2">
      {lvlMoves.length > 0 && (
        <div className="col">
          {lvlMoves
            .sort((a, b) =>
              a.version_group_details[
                a.version_group_details.findIndex(
                  (ver) => ver.version_group.name === generation
                )
              ].level_learned_at >
              b.version_group_details[
                b.version_group_details.findIndex(
                  (ver) => ver.version_group.name === generation
                )
              ].level_learned_at
                ? 1
                : -1
            )
            .map((move) => (
              <Move
                key={`learn-${move.move.name}`}
                move={move.move.name}
                url={move.move.url}
                level={
                  move.version_group_details[
                    move.version_group_details.findIndex(
                      (ver) => ver.version_group.name === generation
                    )
                  ].level_learned_at
                }
              />
            ))}
        </div>
      )}
      {machMoves.length > 0 && (
        <div className="col">
          {machMoves
            .sort((a, b) =>
              a.version_group_details[
                a.version_group_details.findIndex(
                  (ver) => ver.version_group.name === generation
                )
              ] >
              b.version_group_details[
                b.version_group_details.findIndex(
                  (ver) => ver.version_group.name === generation
                )
              ]
                ? 1
                : -1
            )
            .sort((a, b) => (a.move.name > b.move.name ? 1 : -1))
            .map((move) => {
              return (
                <Move
                  key={`machine-${move.move.name}`}
                  move={move.move.name}
                  url={move.move.url}
                  generation={generation}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
export default Moves;
