import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TestController } from "./controllers/test.controller";
import { PrismaService } from "./prisma.service";
import { TestService } from "./services/test.service";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [TestController],
    providers: [TestService, PrismaService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
    ],
})
export class AppModule { }
