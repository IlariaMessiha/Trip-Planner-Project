import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AttractionsController } from "./controllers/attractions.controller";
import { CitiesController } from "./controllers/cities.controller";
import { ReviewsController } from "./controllers/reviews.controller";
import { UsersController } from "./controllers/users.controller";
import { PrismaService } from "./prisma.service";
import { AttractionsService } from "./services/attractions.service";
import { TestService } from "./services/test.service";

@Module({
    controllers: [AttractionsController, CitiesController, ReviewsController, UsersController],
    providers: [AttractionsService, TestService, PrismaService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
    ],
})
export class AppModule {}
