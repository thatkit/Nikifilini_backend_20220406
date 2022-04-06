import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: { },
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
    const params = serialize(filter, '')
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders: Order[] = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination

    return [orders, pagination]
  }

  async findOrder(id: string): Promise<Order | null> {
    const params = serialize(id, '')
    const resp = await this.axios.get('/findOrder?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const order: Order = plainToClass(Order, resp.data.order)

    return order
  }

  async orderStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/orderStatuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orderStatuses: CrmType[] = plainToClass(CrmType, resp.data.orders as Array<any>)

    return orderStatuses
  }

  async productStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/productStatuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const productStatuses: CrmType[] = plainToClass(CrmType, resp.data.orders as Array<any>)

    return productStatuses
  }

  async deliveryTypes(): Promise<CrmType[]> {
    const resp = await this.axios.get('/deliveryTypes')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const deliveryTypes: CrmType[] = plainToClass(CrmType, resp.data.orders as Array<any>)

    return deliveryTypes
  }
}
