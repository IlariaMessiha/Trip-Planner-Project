import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AttractionsController } from "./controllers/attractions.controller";
import { CitiesController } from "./controllers/cities.controller";
import { CommonController } from "./controllers/common.controller";
import { ReviewsController } from "./controllers/reviews.controller";
import { UsersController } from "./controllers/users.controller";
import { MappingDtos } from "./helpers/mappingDtos";
import { PrismaService } from "./prisma.service";
import { AttractionsService } from "./services/attractions.service";
import { CityService } from "./services/cities.service";
import { CommonService } from "./services/common.service";
import { CountriesService } from "./services/countries.service";
import { ReviewsService } from "./services/reviews.service";

import { UserService } from "./services/users.service";

@Module({
    controllers: [
        AttractionsController,
        CitiesController,
        ReviewsController,
        UsersController,
        CommonController,
    ],
    providers: [
        AttractionsService,
        UserService,
        MappingDtos,
        CityService,
        ReviewsService,
        CountriesService,
        PrismaService,
        CommonService,
    ],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
    ],
})
export class AppModule {}
