import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { OrdersFilter } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async getOrders(@Args('page') filter?: OrdersFilter) {
    const arr = await this.retailService.orders(filter)
    return {
      orders: arr[0],
      pagination: arr[1]
    }
  }

  @Query()
  async order(@Args('number') id: string) {
    return this.retailService.findOrder(id)
  }

  @Query()
  async orderStatuses() {
    return this.retailService.orderStatuses()
  }

  @Query()
  async productStatuses() {
    return this.retailService.productStatuses()
  }
}