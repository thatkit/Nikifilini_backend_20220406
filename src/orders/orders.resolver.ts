import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { OrdersResponse } from '../graphql'
import { OrdersFilter } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async getOrders(@Args('page') filter?: OrdersFilter) {
    console.log('"getOrders" query fired')
    return this.retailService.orders(filter)
  }

  @Query()
  async order(@Args('number') id: string) {
    // console.log('"order" query fired')
    // console.log(id)
    return this.retailService.findOrder(id)
  }
}