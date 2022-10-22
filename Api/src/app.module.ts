import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TestController } from "./controllers/test.controller";
import { TestService } from "./services/test.service";

@Module({
    controllers: [TestController],
    providers: [TestService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
    ],
})
export class AppModule {}
