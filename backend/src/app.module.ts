import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL!, {
    tlsInsecure: true,
    ssl: true,
    readPreference: "primary",
    replicaSet: process.env.DATABASE_REPLICA_SET,
    authSource: process.env.DATABASE_AUTH_SOURCE,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_DBNAME
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', "..", 'client'),
    }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
