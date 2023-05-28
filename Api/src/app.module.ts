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

import { SearchController } from "./controllers/search.controller";
import { SearchService } from "./services/search.service";
import { UserService } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";

@Module({
    controllers: [
        AttractionsController,
        CitiesController,
        ReviewsController,
        UsersController,
        CommonController,
        SearchController,
        AuthController,
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
        AuthService,
        UsersService,
    ],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "3000s" },
        }),
    ],
})
export class AppModule {}
