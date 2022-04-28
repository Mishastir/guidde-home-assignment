import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import config from './config';
import { CONFIG_KEY_DATABASE } from './constants';
import { EventsModule } from './events/events.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { username, password, name } = configService.get(CONFIG_KEY_DATABASE)();

        return ({
          uri: `mongodb+srv://${username}:${password}@cluster0.pnoc1.mongodb.net/${name}?retryWrites=true&w=majority`,
        });
      },
    }),
    EventsModule,
    UtilsModule,
  ],
  providers: [AppService],
})
export class AppModule {
}
