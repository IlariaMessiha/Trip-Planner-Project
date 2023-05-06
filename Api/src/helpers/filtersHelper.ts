import { TChatbotFilter, TChatbotQuestion, TChatbotSubmission } from "src/types/TChatbot";
import { mapValues, partition, pickBy } from "lodash";
import { Prisma } from "@prisma/client";

export const replaceDynamicValueInFilter = (
    filter: TChatbotFilter,
    value: string
): TChatbotFilter => {
    return mapValues(filter, rule =>
        mapValues(rule, val => {
            if (typeof val === "string") {
                return val.replace("$value", `${value}`);
            } else {
                return val.map(v => v.replace("$value", `${value}`));
            }
        })
    ) as TChatbotFilter;
};

export const toAttractionsFilter = (filters: TChatbotFilter[]): Prisma.attractionWhereInput[] => {
    return filters.map(filter => ({
        min_age: mapPrismaNumberFilter(filter.minAge),
        attraction_tag: mapPrismaTagsFilter(filter.tags),
    }));
};

export const mapPrismaNumberFilter = (rule: TChatbotFilter[string]): Prisma.IntNullableFilter => {
    return {
        equals: rule?.equals ? parseInt(rule.equals, 10) : undefined,
        not: rule?.not ? parseInt(rule.not, 10) : undefined,
        gt: rule?.gt ? parseInt(rule.gt, 10) : undefined,
        gte: rule?.gte ? parseInt(rule.gte, 10) : undefined,
        lt: rule?.lt ? parseInt(rule.lt, 10) : undefined,
        lte: rule?.lte ? parseInt(rule.lte, 10) : undefined,
        in: rule?.in ? rule.in.map(v => parseInt(v, 10)) : undefined,
        notIn: rule?.notIn ? rule.notIn.map(v => parseInt(v, 10)) : undefined,
    };
};

export const mapPrismaTagsFilter = (
    rule: TChatbotFilter[string] | undefined
): Prisma.Attraction_tagListRelationFilter => {
    return {
        some: {
            tag: {
                code: { in: rule?.in, mode: "insensitive", notIn: rule?.notIn },
            },
        },
    };
};

export const getGlobalFilters = (filters: TChatbotFilter[]) => {
    return filters
        .map(filter => {
            return pickBy(filter, (val, key) => key.startsWith("global"));
        })
        .filter(filter => Object.keys(filter).length > 0);
};
export const getFieldFilters = (filters: TChatbotFilter[]) => {
    return filters
        .map(filter => {
            return pickBy(filter, (val, key) => !key.startsWith("global"));
        })
        .filter(filter => Object.keys(filter).length > 0);
};
