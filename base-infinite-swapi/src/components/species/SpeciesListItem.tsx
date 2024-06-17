import * as React from "react";
import { Species } from "../../types/species/Species.type";

type SpeciesListItemProps = {
  species: Species;
};

const SpeciesListItem: React.FunctionComponent<SpeciesListItemProps> = ({
  species,
}) => {
  const { name, language, averageLifespan } = species;
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {averageLifespan}</li>
      </ul>
    </li>
  );
};

export default SpeciesListItem;
