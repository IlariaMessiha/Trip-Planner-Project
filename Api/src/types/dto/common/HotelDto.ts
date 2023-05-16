export interface HotelDto {
    id: number;
    hotelCode: string;
    label: string;
    address: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    rating: number | null;
    reservationLink: string | null;
    startingFromPrice: number | null;
    mapLocation: {
        long: number;
        lat: number;
    } | null;
    imageUrl: string;
}
