import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: ["http://localhost:3000", "https://trip-planner-project.up.railway.app"],
        },
    });
    const port = process.env.PORT || 3333;
    console.log(`Listening on port ${port}`);
    await app.listen(port);
}
bootstrap();
