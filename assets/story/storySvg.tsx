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
  "accidental-witness": StorySvg.AccidentalWitness,
  batya: StorySvg.Batya,
  "blue-fire": StorySvg.BlueFire,
  "falling-skies": StorySvg.FallingSkies,
  roadmap: StorySvg.Roadmap,
  "the-labyrinth": StorySvg.TheLabyrinth,
  "the-ticket": StorySvg.TheTicket,
  "the-unheard": StorySvg.TheUnheard,
  "they-are-already-here": StorySvg.TheyAreAlreadyHere,
  tour: StorySvg.Tour,
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
