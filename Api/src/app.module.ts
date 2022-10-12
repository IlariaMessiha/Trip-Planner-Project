import { Module } from "@nestjs/common";
import { TestController } from "./controllers/test.controller";
import { TestService } from "./services/test.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
    controllers: [TestController],
    providers: [TestService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
    ],
})
export class AppModule {}
