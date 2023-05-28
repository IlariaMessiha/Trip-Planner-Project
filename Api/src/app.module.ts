import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

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

import { SearchController } from "./controllers/search.controller";
import { SearchService } from "./services/search.service";
import { UserService } from "./services/users.service";

@Module({
    controllers: [
        AttractionsController,
        CitiesController,
        ReviewsController,
        UsersController,
        CommonController,
        SearchController,
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
        SearchService,
    ],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
    ],
})
export class AppModule {}
