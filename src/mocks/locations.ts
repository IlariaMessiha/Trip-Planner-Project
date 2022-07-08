import { Location } from "../models/Location";
import BarcelonaCover from "../assets/images/Barcelona.jpg"
export const barcelonaLocation: Location = {
    id: '1',
    name: 'Barcelona',
    activities: 400,
    country: 'Spain',
    continent: 'Europe',
    coverImage: BarcelonaCover
}
export const location2: Location = {
    id: '2',
    name: 'Porto',
    activities: 200,
    country: 'Portugal',
    continent: 'Europe'

}
export const location3: Location = {
    id: '3',
    name: 'Nice',
    activities: 200,
    country: 'France',
    continent: 'Europe'

}
export const location4: Location = {
    id: '4',
    name: 'Rio de janero',
    activities: 300,
    country: 'Brasil',
    continent: 'Latin America'

}
export const location5: Location = {
    id: '5',
    name: 'Paris',
    activities: 400,
    country: 'France',
    continent: 'Europe'
}
export const location6: Location = {
    id: '6',
    name: 'New York',
    activities: 100,
    country: 'United States',
    continent: 'America'
}
export const location7: Location = {
    id: '7',
    name: 'Egypt',
    activities: 400,
    country: 'Egypt',
    continent: 'Africa'
}
export const locations: Location[] = [
    barcelonaLocation,
    location2,
    location3,
    location4,
    location5,
    location6,
    location7
]