import { useState } from "react";
import { Tabs, Tab, Panel } from "../../utils/Tabs/Tabs";
import Stats from "./Stats";
import Description from "./Description";
import Evolution from "./Evolution";
import Moves from "./Moves";
const Body = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleChange = (e, value) => {
    setActiveTab(value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Tabs selectedTab={activeTab} onChange={handleChange}>
            <Tab color={data?.types[0].type.name} label="About" value={1} />
            <Tab color={data?.types[0].type.name} label="Evolution" value={2} />
            <Tab color={data?.types[0].type.name} label="Moves" value={3} />
          </Tabs>
          <div
            className="card border-0 pokemon-card"
            style={{ borderRadius: "2rem" }}
          >
            <div className="card-body">
              <div className="tab-content">
                <Panel value={activeTab} selectedIndex={1}>
                  <Description
                    genera={data?.genera}
                    flavorText={data?.flavor_text_entries}
                    height={data?.height}
                    weight={data?.weight}
                  />
                  <Stats stats={data?.stats} type={data?.types[0].type.name} />
                </Panel>
                <Panel value={activeTab} selectedIndex={2}>
                  <Evolution url={data?.evolution_chain.url} />
                </Panel>
                <Panel value={activeTab} selectedIndex={3}>
                  <Moves moves={data?.moves} type={data?.types[0].type.name} />
                </Panel>
              </div>
            </div>
          </div>
          {/* <div className="row">
              <div className="col text-center mb-3">
                <button
                  className="btn btn-sm btn-light rounded-circle"
                  style={{ top: "50%", right: "0px" }}
                  // onClick={onClickSpeak}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.5 8H4C3.44772 8 3 8.44772 3 9V15C3 15.5523 3.44772 16 4 16H9.5L16 21V3L9.5 8Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 9.35425C20.6224 10.0594 21 10.9856 21 12.0001C21 13.0145 20.6224 13.9408 20 14.6459"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div> 
              
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Body;
