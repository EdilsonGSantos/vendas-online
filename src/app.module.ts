import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { Address2Controller } from './address2/address2.controller';
import { Auth2Controller } from './auth2/auth2.controller';
import { Cart2Controller } from './cart2/cart2.controller';
import { Category2Controller } from './category2/category2.controller';
import { City2Controller } from './city2/city2.controller';
import { Product2Controller } from './product2/product2.controller';
import { User2Controller } from './user2/user2.controller';
import { State2Controller } from './state2/state2.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
  ],
  controllers: [CartController, Address2Controller, Auth2Controller, Cart2Controller, Category2Controller, City2Controller, Product2Controller, User2Controller, State2Controller],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
