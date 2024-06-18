import { PaginationResponse } from "../types/api/pagination/pagination.response.type";
import { PersonDto } from "../types/api/people/Person.dto.type";
import { Species } from "../types/species/Species.type";

export async function fetchPeople(
  pageNumber: number = 1
): Promise<PaginationResponse<PersonDto>> {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pageNumber}`
  );
  return response.json();
}

export async function fetchSpecies(): Promise<Species[]> {
  const response = await fetch("https://swapi.dev/api/species/");
  return response.json();
}
