// https://hybridshivam.com/pokedex/pokemon/1
import { stoneToImage } from "./stoneToImage";
export const evolutionDetails = ({
  gender,
  held_item,
  item,
  known_move,
  known_move_type,
  location,
  min_affection,
  min_beauty,
  min_happiness,
  min_level,
  needs_overworld_rain,
  party_species,
  party_type,
  relative_physical_stats,
  time_of_day,
  trade_species,
  trigger,
  turn_upside_down,
}) => {
  if (min_level !== null) {
    return <li>Level {min_level}</li>;
  }
  if (gender !== null) {
    if (gender === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ height: "15px" }}
          className="mb-2"
        >
          <path
            d="M15 15.5C15 19.0899 12.0899 22 8.5 22C4.91015 22 2 19.0899 2 15.5C2 11.9101 4.91015 9 8.5 9C12.0899 9 15 11.9101 15 15.5Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 2H22V9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 10.5L22 2"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (gender === 2) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ height: "15px" }}
          className="mb-2"
        >
          <path
            d="M18.5 8.5C18.5 12.0899 15.5899 15 12 15C8.41015 15 5.5 12.0899 5.5 8.5C5.5 4.91015 8.41015 2 12 2C15.5899 2 18.5 4.91015 18.5 8.5Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 19H16.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22L12 15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  }
  if (held_item) {
    return (
      <li className="text-capitalize">
        Holding {held_item.name.replace("-", " ")}
      </li>
    );
  }
  if (item) {
    return <li>{stoneToImage(item.name)}</li>;
  }
  if (known_move) {
    return (
      <li className="text-capitalize">
        knows {known_move.name.replace("-", " ")}
      </li>
    );
  }
  if (known_move_type) {
    return (
      <li className="text-capitalize">
        knows {known_move_type.name.replace("-", " ")}
      </li>
    );
  }
};
