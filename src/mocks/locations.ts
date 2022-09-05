import { Location } from "../models/Location";
import BarcelonaCover from "../assets/images/Barcelona.jpg"
import portoCover from "../assets/images/porto2.jpg"
import niceCover from "../assets/images/nice.jpg"
import rioDeJaneroCover from "../assets/images/rio de janeiro.jpg"
import parisCover from "../assets/images/paris.jpg"
import newYorkCover from "../assets/images/new york.jpg"
import egyptCover from "../assets/images/egypt.jpg"

export const barcelonaLocation: Location = {
    id: '1',
    name: 'Barcelona',
    activities: 400,
    country: 'Spain',
    continent: 'Europe',
    coverImage: BarcelonaCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "
}
export const portoLocation: Location = {
    id: '2',
    name: 'Porto',
    activities: 200,
    country: 'Portugal',
    continent: 'Europe',
    coverImage: portoCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "

}
export const niceLocation: Location = {
    id: '3',
    name: 'Nice',
    activities: 200,
    country: 'France',
    continent: 'Europe',
    coverImage: niceCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "

}
export const rioDeJaneroLocation: Location = {
    id: '4',
    name: 'Rio de Janero',
    activities: 300,
    country: 'Brasil',
    continent: 'Latin America',
    coverImage: rioDeJaneroCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "

}
export const parisLocation: Location = {
    id: '5',
    name: 'Paris',
    activities: 400,
    country: 'France',
    continent: 'Europe',
    coverImage: parisCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "
}
export const newYorkLocation: Location = {
    id: '6',
    name: 'New York',
    activities: 100,
    country: 'United States',
    continent: 'America',
    coverImage: newYorkCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "
}
export const egyptLocation: Location = {
    id: '7',
    name: 'Egypt',
    activities: 400,
    country: 'Egypt',
    continent: 'Africa',
    coverImage: egyptCover,
    description: "Porto is a coastal city in northwest Portugal known for its stately bridges and port wine production. In the medieval Ribeira (riverside) district, narrow cobbled streets wind past merchants’ houses and cafes. "
}
export const locations: Location[] = [
    barcelonaLocation,
    portoLocation,
    niceLocation,
    rioDeJaneroLocation,
    parisLocation,
    newYorkLocation,
    egyptLocation
]