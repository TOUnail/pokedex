import React from "react";
import dawnStone from "../assets/stones/dawn-stone.png";
import duskStone from "../assets/stones/dusk-stone.png";
import fireStone from "../assets/stones/fire-stone.png";
import iceStone from "../assets/stones/ice-stone.png";
import leafStone from "../assets/stones/leaf-stone.png";
import waterStone from "../assets/stones/water-stone.png";
import thunderStone from "../assets/stones/thunder-stone.png";
import moonStone from "../assets/stones/moon-stone.png";
import sunStone from "../assets/stones/sun-stone.png";

export const stoneToImage = (stone) => {
  switch (stone) {
    case "fire-stone":
      return (
        <img
          className="fire-stone evolution-stone"
          src={fireStone}
          alt="fire stone"
        />
      );
    case "water-stone":
      return (
        <img
          className="water-stone evolution-stone"
          src={waterStone}
          alt="water stone"
        />
      );
    case "ice-stone":
      return (
        <img
          className="ice-stone evolution-stone"
          src={iceStone}
          alt="ice stone"
        />
      );
    case "thunder-stone":
      return (
        <img
          className="thunder-stone evolution-stone"
          src={thunderStone}
          alt="thunder stone"
        />
      );
    case "moon-stone":
      return (
        <img
          className="moon-stone evolution-stone"
          src={moonStone}
          alt="moon stone"
        />
      );
    case "leaf-stone":
      return (
        <img
          className="leaf-stone evolution-stone"
          src={leafStone}
          alt="leaf stone"
        />
      );
    case "dawn-stone":
      return (
        <img
          className="dawn-stone evolution-stone"
          src={dawnStone}
          alt="dawn stone"
        />
      );
    case "dusk-stone":
      return (
        <img
          className="dusk-stone evolution-stone"
          src={duskStone}
          alt="dusk stone"
        />
      );
    case "sun-stone":
      return (
        <img
          className="sun-stone evolution-stone"
          src={sunStone}
          alt="sun stone"
        />
      );
    default:
      return stone;
  }
};
