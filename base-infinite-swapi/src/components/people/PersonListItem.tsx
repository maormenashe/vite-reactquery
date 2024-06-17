import * as React from "react";
import { Person } from "../../types/people/Person.type";

type PersonListItemProps = {
  person: Person;
};

const PersonListItem: React.FunctionComponent<PersonListItemProps> = ({
  person,
}) => {
  const { name, hairColor, eyeColor } = person;
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
};

export default PersonListItem;
