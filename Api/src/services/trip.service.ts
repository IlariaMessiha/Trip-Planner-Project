import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { chain, mapValues, pickBy, uniq } from "lodash";
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
import { Trip } from "src/types/Trip";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";
import { UpdateTripBodyDto } from "src/types/dto/trips/UpdateTripBodyDto";

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
    async findCityCodes() {
        const cities = await this.prisma.city.findMany({
            select: {
                city_code: true,
            },
            take: 10,
        });
        return cities.map(c => {
            return c.city_code;
        });
    }
    findChatbotFlow(): TChatbotFlow {
        return flow;
    }

    deduceFiltersByTarget(submissions: TChatbotSubmission[]) {
        // TODO : group submission by question code, if a question has multiple answers, we should treat them as OR not AND
        return chain(submissions)
            .groupBy(s => s.questionCode)
            .reduce((filtersByTarget, submissions, questionCode) => {
                const question = flow.questions.find(question => question.code === questionCode);
                const filters = submissions.map(submission =>
                    this.deduceFilterFromSubmission(submission, question)
                );
                const filter = this.mergeFilters(filters);
                if (filter && Object.keys(filter).length > 0) {
                    question.searchTargets.forEach(target => {
                        filtersByTarget[target] = [...(filtersByTarget[target] || []), filter];
                    });
                }
                return filtersByTarget;
            }, {} as Record<TChatbotQuestionSearchTarget, TChatbotFilter[]>)
            .value();
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

    mergeFilters(filters: TChatbotFilter[]): TChatbotFilter {
        if (filters.length === 1) {
            return filters[0];
        }
        const merge2Filters = (filter1: TChatbotFilter, filter2: TChatbotFilter) => {
            const commonKeys = pickBy(filter1, (value, key) => filter2[key] !== undefined);

            const mergedCommonKeys: TChatbotFilter = mapValues(commonKeys, (value, key) => ({
                in: uniq([...(value.in || []), ...(filter2[key].in || [])]),
                notIn: uniq([...(value.notIn || []), ...(filter2[key].notIn || [])]),
            }));

            return {
                ...filter1,
                ...filter2,
                ...mergedCommonKeys,
            };
        };

        return chain(filters)
            .filter(filter => filter && Object.keys(filter).length > 0)
            .reduce(
                (mergedFilter, filter) => merge2Filters(mergedFilter, filter),
                {} as TChatbotFilter
            )
            .value();
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
    async findTrip(id: number) {
        return await this.prisma.trip.findUnique({
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
    }
    async updateTrip(tripId: number, updateTripBody: UpdateTripBodyDto) {
        return await this.prisma.trip.update({
            where: {
                id: tripId,
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
            data: {
                label: updateTripBody.tripLabel,
                start_date: updateTripBody.startDate,
                end_date: updateTripBody.endDate,
            },
        });
    }
}
