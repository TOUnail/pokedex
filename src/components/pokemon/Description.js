const Description = ({ genera, flavorText, height, weight, abilities }) => {
  let genus = genera
    .filter((entry) => entry.language.name === "en")
    .map((text) => text.genus);
  let exerpt = flavorText
    .filter((entry) => entry.language.name === "en")
    //.filter((version) => version.name === "red")
    .map((text) => text.flavor_text);
  const newLineText = (text) => {
    const newText = text.replace("\n", " ").replace("\f", " ");
    return newText;
  };
  return (
    <>
      <div className="row justify-content-between">
        <div className="col text-center">
          <ul className="list-inline mb-0">
            <li className="list-inline-item me-4">
              <p className="mb-0">
                <strong
                  dangerouslySetInnerHTML={{
                    __html: newLineText(genus[0]),
                  }}
                />
              </p>
            </li>
            <li className="list-inline-item me-4">
              Ht: {(height * 0.3280839895).toFixed(2)} ft
            </li>
            <li className="list-inline-item me-4">
              Wt: {(weight * 0.220462).toFixed(1)} lbs
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <p
            dangerouslySetInnerHTML={{
              __html: newLineText(exerpt[exerpt.length - 1]),
            }}
            className="mb-5"
          />
        </div>
      </div>
    </>
  );
};

export default Description;
