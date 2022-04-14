import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { Order, OrdersFilter } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async getOrders(@Args('page') filter?: OrdersFilter): Promise<OrdersResponse> {
    const arr = await this.retailService.orders(filter)
    return {
      orders: arr[0],
      pagination: arr[1]
    }
  }

  @Query()
  async order(@Args('number') id: string): Promise<Order> {
    return this.retailService.findOrder(id)
  }
}