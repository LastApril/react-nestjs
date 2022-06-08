import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const TTL = 60 * 1000;
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'DASHBOARD_SESSION_ID',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: TTL,
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/',
        dbName: 'dashboard',
        collectionName: 'sessions',
        ttl: TTL,
        autoRemove: 'native',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
