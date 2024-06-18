import { PaginationResponse } from "../types/api/pagination/pagination.response.type";
import { PersonDto } from "../types/api/people/Person.dto.type";
import { SpeciesDto } from "../types/api/species/Species.dto.type";

export async function fetchPeople(
  pageNumber: number = 1
): Promise<PaginationResponse<PersonDto>> {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pageNumber}`
  );
  return response.json();
}

export async function fetchSpecies(
  pageNumber: number = 1
): Promise<PaginationResponse<SpeciesDto>> {
  const response = await fetch(
    `https://swapi.dev/api/species/?page=${pageNumber}`
  );
  return response.json();
}
