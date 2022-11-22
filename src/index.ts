import {App} from "./app";

function bootstrap() {
    const app = new App();
    app.init().then();
}

bootstrap();