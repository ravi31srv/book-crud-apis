import { Module } from '@nestjs/common';
import { notificationGateway } from './socketGateway';

@Module({
  imports  :[],
  providers: [notificationGateway ],
  exports: [notificationGateway],
})
export class NotificationModule {}
