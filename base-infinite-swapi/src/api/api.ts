import { Person } from "../types/people/Person.type";
import { Species } from "../types/species/Species.type";

export async function fetchPeople(): Promise<Person[]> {
  const response = await fetch("https://swapi.dev/api/people/");
  return response.json();
}

export async function fetchSpecies(): Promise<Species[]> {
  const response = await fetch("https://swapi.dev/api/species/");
  return response.json();
}
