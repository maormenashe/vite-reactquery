import * as React from "react";
import { PersonDto } from "../../types/api/people/Person.dto.type";

type PersonListItemProps = {
  person: PersonDto;
};

const PersonListItem: React.FunctionComponent<PersonListItemProps> = ({
  person,
}) => {
  const { name, hair_color, eye_color } = person;
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hair_color}</li>
        <li>eyes: {eye_color}</li>
      </ul>
    </li>
  );
};

export default PersonListItem;
