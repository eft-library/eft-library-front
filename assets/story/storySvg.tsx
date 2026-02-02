import AccidentalWitness from "./accidental-witness";
import Batya from "./batya";
import BlueFire from "./blue-fire";
import FallingSkies from "./falling-skies";
import Roadmap from "./roadmap";
import TheLabyrinth from "./the-labyrinth";
import TheTicket from "./the-ticket";
import TheUnheard from "./the-unheard";
import TheyAreAlreadyHere from "./they-are-already-here";
import Tour from "./tour";

export const StorySvg = {
  AccidentalWitness,
  Batya,
  BlueFire,
  FallingSkies,
  Roadmap,
  TheLabyrinth,
  TheTicket,
  TheUnheard,
  TheyAreAlreadyHere,
  Tour,
};

export const StorySvgComponents = {
  test: StorySvg.AccidentalWitness,
  test2: StorySvg.Batya,
  "3": StorySvg.BlueFire,
  "4": StorySvg.FallingSkies,
  "5": StorySvg.Roadmap,
  "6": StorySvg.TheLabyrinth,
  "7": StorySvg.TheTicket,
  "8": StorySvg.TheUnheard,
  "9": StorySvg.TheyAreAlreadyHere,
  "10": StorySvg.Tour,
};

export const getStorySVG = (
  id: string,
  width: number,
  height: number,
  color: string,
) => {
  if (!(id in StorySvgComponents)) {
    return null;
  }
  const Svg = StorySvgComponents[id as keyof typeof StorySvgComponents];

  if (!Svg) {
    return null;
  }

  return <Svg height={height} width={width} color={color} />;
};
