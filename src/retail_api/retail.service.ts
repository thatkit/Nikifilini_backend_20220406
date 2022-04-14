import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { plainToClass } from 'class-transformer'
require('dotenv').config()

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {
        'x-api-key': process.env.RETAIL_KEY
      },
    })

    this.axios.interceptors.request.use((config) => {
      // console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        // console.log("Result:", r.data)
        return r
      },
      (r) => {
        // console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const resp = await this.axios.get('/orders?page=' + filter)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders: Order[] = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination
    return [orders, pagination]
  }

  async findOrder(id: string): Promise<Order | null> {
    const resp = await this.axios.get('/orders/' + id + '?site=demo-magazin&by=id')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const order: Order = plainToClass(Order, resp.data.order)
    return order
  }

  async orderStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orderStatuses: CrmType[] = Object.values(resp.data.statuses)
    return orderStatuses
  }

  async productStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/product-statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const productStatuses: CrmType[] = Object.values(resp.data.productStatuses)
    return productStatuses
  }

  async deliveryTypes(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/delivery-types')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const deliveryTypes: CrmType[] = Object.values(resp.data.deliveryTypes)
    return deliveryTypes
  }
}
