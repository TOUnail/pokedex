import { useState, useEffect } from "react";
import Move from "./Move";
import { Tabs, Tab, Panel } from "../../utils/Tabs/Tabs";
import { lvlUpMoves, machineMoves } from "../../helpers/learnset";
const Moves = ({ moves, type }) => {
  const [lvlMoves, setLvlMoves] = useState([]);
  const [machMoves, setMachMoves] = useState([]);
  const [generation, setGeneration] = useState("sun-moon");

  const [activeTab, setActiveTab] = useState(1);
  const handleChange = (e, value) => {
    setActiveTab(value);
  };
  useEffect(() => {
    setLvlMoves(lvlUpMoves(moves, generation));
    setMachMoves(machineMoves(moves, generation));
  }, [moves, generation]);
  // console.log(machMoves);
  return (
    <div className="row">
      <div className="col">
        <Tabs selectedTab={activeTab} onChange={handleChange}>
          <Tab color={type} label="By Level Up" value={1} />
          <Tab color={type} label="TM/HM" value={2} />
        </Tabs>
        <div className="tab-content">
          <Panel value={activeTab} selectedIndex={1}>
            {lvlMoves.length > 0 && (
              <>
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
              </>
            )}
          </Panel>
          <Panel value={activeTab} selectedIndex={2}>
            {machMoves.length > 0 && (
              <>
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
              </>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
};
export default Moves;
