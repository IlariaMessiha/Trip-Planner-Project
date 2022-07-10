import { Activity } from "../models/Activity";
import { barcelonaLocation, egyptLocation, newYorkLocation, parisLocation, portoLocation } from "./locations";
import sagradaFamiliaCover from '../assets/images/sagrada familia.jpg'
import parkGuellCover from '../assets/images/park guell.jpg'
import timeSquareCover from '../assets/images/time square.jpg'
import thePyrmidsCover from '../assets/images/the pyramids.jpg'
import fishingTripCover from '../assets/images/fsishing trip .jpg'
import eiffelTowerCover from '../assets/images/paris.jpg'
export const activity1: Activity = {
    id: '1',
    name: 'Sagrada Familia',
    address: 'C/ de Mallorca, 401, 08013 Barcelona',
    location: barcelonaLocation,
    numberOfReviews: 80,
    description: 'The Basílica i Temple Expiatori de la Sagrada Família also known as the Sagrada Família, is a large unfinished minor basilica in the Eixample district of Barcelona, Catalonia, Spain, and is currently the largest unfinished Roman Catholic church. Designed by the Catalan architect Antoni Gaudí (1852–1926), his work on the building is part of a UNESCO World Heritage Site.[7] On 7 November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica.',
    coverImage: sagradaFamiliaCover
}
export const activity2: Activity = {
    id: '2',
    name: 'Park Guell',
    address: '08024 Barcelona',
    location: portoLocation,
    numberOfReviews: 40,
    description: 'Parc Güell is a privatized park system composed of gardens and architectural elements located on Carmel Hill, in Barcelona, Catalonia, Spain. Carmel Hill belongs to the mountain range of Collserola – the Parc del Carmel is located on the northern face. Park Güell is located in La Salut, a neighborhood in the Gràcia district of Barcelona. With urbanization in mind, Eusebi Güell assigned the design of the park to Antoni Gaudí, a renowned architect and the face of Catalan modernism.',
    coverImage: parkGuellCover

}
export const activity3: Activity = {
    id: '3',
    name: 'Time Square',
    address: 'Manhattan, NY 10036',
    location: newYorkLocation,
    coverImage: timeSquareCover,
    numberOfReviews: 100,
    description: 'Times Square is a major commercial intersection, tourist destination, entertainment center, and neighborhood in Midtown Manhattan, New York. It is formed by the junction of Broadway, Seventh Avenue and 42nd Street. Together with adjacent Duffy Square, Times Square is a bowtie-shaped space five blocks long between 42nd and 47th Streets.'
}
export const activity4: Activity = {
    id: '4',
    name: 'The pyramids',
    address: 'Al Haram, Giza Governorate 3512201',
    location: egyptLocation,
    coverImage: thePyrmidsCover,
    numberOfReviews: 500,
    description: 'The Egyptian pyramids are ancient masonry structures located in Egypt. Sources cite at least 118 identified "Egyptian" pyramids. Approximately 80 pyramids were built within the Kingdom of Kush, now located in the modern country of Sudan. Of those located in modern Egypt, most were built as tombs for the country s pharaohs and their consorts during the Old and Middle Kingdom periods'
}
export const activity5: Activity = {
    id: '5',
    name: 'Fishing trip, Ain Sokhna',
    address: 'km 46 Suez - Hurghada Road، Ain Soukhna، Suez Governorate 43111',
    location: egyptLocation,
    coverImage: fishingTripCover,
    numberOfReviews: 20,
    description: 'Spend the whole day on private Yacht fishing, swimming, or just relaxing off the Shore of Ain Sokhna coastal city.A trip is best if you are on a short stay in Cairo and wish to spend some time in the Red Sea.'
}
export const activity7: Activity = {
    id: '7',
    name: 'Eiffel Tower',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    location: parisLocation,
    coverImage: eiffelTowerCover,
    numberOfReviews: 80,
    description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.'
}
export const activities: Activity[] = [
    activity1,
    activity2,
    activity3,
    activity4,
    activity5,
    activity7
]