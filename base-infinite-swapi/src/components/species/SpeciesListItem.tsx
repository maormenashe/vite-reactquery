import * as React from "react";
import { SpeciesDto } from "../../types/api/species/Species.dto.type";

type SpeciesListItemProps = {
  species: SpeciesDto;
};

const SpeciesListItem: React.FunctionComponent<SpeciesListItemProps> = ({
  species,
}) => {
  const { name, language, average_lifespan } = species;
  return (
    <li>
      {name}
      <ul>
        <li>language: {language}</li>
        <li>average lifespan: {average_lifespan}</li>
      </ul>
    </li>
  );
};

export default SpeciesListItem;
