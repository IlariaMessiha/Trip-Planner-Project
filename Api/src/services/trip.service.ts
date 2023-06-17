import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { flow } from "src/data/ChatbotFlow";
import { MappingDtos } from "src/helpers/MappingDtos";
import {
    replaceDynamicValueInFilter,
    toAttractionsFilter,
    toRestaurantsFilter,
} from "src/helpers/filtersHelper";
import { PrismaService } from "src/prisma.service";
import {
    TChatbotFilter,
    TChatbotFlow,
    TChatbotQuestion,
    TChatbotQuestionSearchTarget,
    TChatbotSubmission,
} from "src/types/TChatbot";
import { Trip, TripFull } from "src/types/Trip";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";

@Injectable()
export class TripService {
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}
    async findDestinations(): Promise<GetDestinationNameDto> {
        const cities = await this.prisma.city.findMany();
        const countries = await this.prisma.country.findMany();
        return {
            citiesName: cities.map(city => {
                return city.label;
            }),
            countriesName: countries.map(country => {
                return country.label;
            }),
        };
    }
    findChatbotFlow(): TChatbotFlow {
        return flow;
    }

    deduceFiltersByTarget(submissions: TChatbotSubmission[]) {
        return submissions.reduce((filtersByTarget, submission) => {
            const question = flow.questions.find(
                question => question.code === submission.questionCode
            );
            const filter = this.deduceFilterFromSubmission(submission, question);
            if (filter && Object.keys(filter).length > 0) {
                question.searchTargets.forEach(target => {
                    filtersByTarget[target] = [...(filtersByTarget[target] || []), filter];
                });
            }
            return filtersByTarget;
        }, {} as Record<TChatbotQuestionSearchTarget, TChatbotFilter[]>);
    }

    deduceFilterFromSubmission(submission: TChatbotSubmission, question: TChatbotQuestion) {
        if (question.type === "text") {
            return replaceDynamicValueInFilter(question.filter || {}, submission.value);
        }
        if (question.answers) {
            const selectedAnswer = question.answers.find(
                answer => answer.code === submission.value || answer.text === submission.value
            );
            if (selectedAnswer?.filter) {
                return selectedAnswer.filter;
            }
        }
    }

    async findAttractionPool(filters: TChatbotFilter[]) {
        return await this.prisma.attraction.findMany({
            where: {
                AND: toAttractionsFilter(filters),
            },
        });
    }

    async findRestaurantPool(filters: TChatbotFilter[]) {
        return await this.prisma.restaurant.findMany({
            where: {
                AND: toRestaurantsFilter(filters),
            },
            include: {
                restaurant_tag: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
    }

    async saveTrip(trip: Trip, user_id: number) {
        return await this.prisma.trip.create({
            data: {
                label: trip.label,
                start_date: trip.startDate,
                end_date: trip.endDate,
                user_id,
                trip_items: {
                    createMany: {
                        data: trip.tripItems.map(
                            (tripItem): Prisma.trip_itemCreateManyTripInput => ({
                                attraction_id: tripItem.attraction?.id || null,
                                restaurant_id: tripItem.restaurant?.id || null,
                                datetime: tripItem.dateTime,
                            })
                        ),
                    },
                },
            },
            include: {
                trip_items: {
                    include: {
                        attraction: {
                            include: {
                                directus_files: true,
                            },
                        },
                        restaurant: {
                            include: {
                                directus_files: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findTrip(id: number): Promise<TripFull> {
        const trip = await this.prisma.trip.findUnique({
            where: {
                id,
            },
            include: {
                trip_items: {
                    include: {
                        attraction: {
                            include: {
                                directus_files: true,
                            },
                        },
                        restaurant: {
                            include: {
                                directus_files: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            end_date: trip.end_date,
            id: trip.id,
            label: trip.label,
            start_date: trip.start_date,
            trip_code: trip.trip_code,
            user_id: trip.user_id,
            trip_items: trip.trip_items,
        };
    }
}
