import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Types from "../Types";

const Move = ({ move, url, level, generation }) => {
  // console.log(move);

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["move", url],
    () => {
      return axios.get(url);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 1,
      staleTime: 1,
    }
  );
  // console.log(data);
  const machineUrl = data?.data.machines.find(
    (gen) => gen.version_group.name === generation
  );
  const tmhm = useQuery(
    ["machine", machineUrl?.machine.url],
    async () => {
      return await axios.get(machineUrl?.machine.url);
    },
    {
      enabled: !!machineUrl,
    }
  );

  return (
    <>
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
      {isSuccess && (
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <div>
            <p className="mb-0 text-capitalize fw-bold">
              {move.replace("-", " ")}
            </p>
            {level && <p className="text-muted mb-0">Level {level}</p>}
            {tmhm.isSuccess && (
              <p className="text-muted mb-0 text-uppercase">
                {tmhm.data.data.item.name}
              </p>
            )}
          </div>
          <Types type={data?.data.type.name} />
        </div>
      )}
    </>
  );
};

export default Move;
