import { Activity } from "../models/Activity";
import { barcelonaLocation, egyptLocation, newYorkLocation, parisLocation } from "./locations";
import { review1, review2, review3, review4, review5, review6 } from "./reviews";
export const activity1: Activity = {
    id: '1',
    name: 'Sagrada Familia',
    address: 'C/ de Mallorca, 401, 08013 Barcelona',
    location: barcelonaLocation,
    openHours: "8:00 AM - 6:00 PM",
    description: 'The Basílica i Temple Expiatori de la Sagrada Família also known as the Sagrada Família, is a large unfinished minor basilica in the Eixample district of Barcelona, Catalonia, Spain, and is currently the largest unfinished Roman Catholic church. Designed by the Catalan architect Antoni Gaudí (1852–1926), his work on the building is part of a UNESCO World Heritage Site.[7] On 7 November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica.',
    coverImage: "/images/sagrada familia.jpg",
    review: [review1, review2],
    suggestedDuration: "2-3 ",
    ticketPrice: "200$",
    averageRating: 3,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/'

}
export const activity2: Activity = {
    id: '2',
    name: 'Park Guell',
    address: '08024 Barcelona',
    location: barcelonaLocation,
    openHours: "8:00 AM - 6:00 PM",
    description: 'Parc Güell is a privatized park system composed of gardens and architectural elements located on Carmel Hill, in Barcelona, Catalonia, Spain. Carmel Hill belongs to the mountain range of Collserola – the Parc del Carmel is located on the northern face. Park Güell is located in La Salut, a neighborhood in the Gràcia district of Barcelona. With urbanization in mind, Eusebi Güell assigned the design of the park to Antoni Gaudí, a renowned architect and the face of Catalan modernism.',
    coverImage: "/images/park guell.jpg",
    suggestedDuration: "2-3 ",
    ticketPrice: "200$",
    averageRating: 4.5,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/'


}
export const activity3: Activity = {
    id: '3',
    name: 'Time Square',
    address: 'Manhattan, NY 10036',
    location: newYorkLocation,
    coverImage: "/images/time square.jpg",
    openHours: "8:00 AM - 6:00 PM",
    suggestedDuration: "2-3 ",
    ticketPrice: "200$",
    averageRating: 1,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/',
    description: 'Times Square is a major commercial intersection, tourist destination, entertainment center, and neighborhood in Midtown Manhattan, New York. It is formed by the junction of Broadway, Seventh Avenue and 42nd Street. Together with adjacent Duffy Square, Times Square is a bowtie-shaped space five blocks long between 42nd and 47th Streets.'
}

export const activity4: Activity = {
    id: '4',
    name: 'The Pyramids',
    suggestedDuration: "2-3 ",
    ticketPrice: "200$",
    address: 'Al Haram, Giza Governorate 3512201',
    location: egyptLocation,
    coverImage: "/image/the pyramids.jpg",
    openHours: "8:00 AM - 6:00 PM",
    review: [review3],
    averageRating: 3,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/',
    description: 'The Egyptian pyramids are ancient masonry structures located in Egypt. Sources cite at least 118 identified "Egyptian" pyramids. Approximately 80 pyramids were built within the Kingdom of Kush, now located in the modern country of Sudan. Of those located in modern Egypt, most were built as tombs for the country s pharaohs and their consorts during the Old and Middle Kingdom periods'
}
export const activity5: Activity = {
    id: '5',
    name: 'Fishing trip, Ain Sokhna',
    address: 'km 46 Suez - Hurghada Road، Ain Soukhna، Suez Governorate 43111',
    location: egyptLocation,
    ticketPrice: "200$",
    review: [review4],
    coverImage: "/images/fsishing trip.jpg",
    suggestedDuration: "2-3 ",
    openHours: "8:00 AM - 6:00 PM",
    averageRating: 5,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/',
    description: 'Spend the whole day on private Yacht fishing, swimming, or just relaxing off the Shore of Ain Sokhna coastal city.A trip is best if you are on a short stay in Cairo and wish to spend some time in the Red Sea.'
}
export const activity7: Activity = {
    id: '7',
    name: 'Eiffel Tower',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    location: parisLocation,
    coverImage: "/images/eiffe tower.jpg",
    ticketPrice: "200$",
    review: [review5, review6],
    suggestedDuration: "2-3 ",
    openHours: "8:00 AM - 6:00 PM",
    averageRating: 2,
    gallery: ["/images/SF1.jpg", "/images/SF2.jpg", "/images/SF3.jpg", "/images/SF4.jpg"],
    phoneNumber: "tel:01228224461",
    email: "mailto:ilariarefaat20@gmail.com",
    website: 'https://www.youtube.com/',
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