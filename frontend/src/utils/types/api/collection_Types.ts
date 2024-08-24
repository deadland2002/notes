import { Custom_API_RES } from './common'
import {CollectionType, PageType} from "../../helper/DirFormatter";

export interface REQ_ADD_COLLECTION {
  name: string
  parent: number | null
}
export type RES_ADD_COLLECTION =  Custom_API_RES<
    {
      id: number,
      name: string,
      isDeleted: 0 | 1,
      userRef: number,
      parent: number | null
    }
>

export interface REQ_COLLECTION_BY_ID {
  id: number | null
}
export type RES_COLLECTION_BY_ID = Custom_API_RES<{
  id: number
  name: string
  isDeleted: 0 | 1
  userRef: number
  parent: null | number
}>

export interface REQ_COLLECTION_BY_PARENT_ID {
  parent: number | null
}
export type RES_COLLECTION_BY_PARENT_ID = Custom_API_RES<{
  id: number
  name: string
  isDeleted: 0 | 1
  userRef: number
  parent: null | number
}>

export interface REQ_ALL_COLLECTION_BY_PARENT_ID {
  parent: number | null
}
export type RES_ALL_COLLECTION_BY_PARENT_ID = Custom_API_RES<(CollectionType | PageType)[]>


export interface REQ_ADD_PAGE {
    name: string
    collectionId: number
}

export type RES_ADD_PAGE =  Custom_API_RES<
    {
        id: number,
        name: string,
        isDeleted: 0 | 1,
        content: string | null,
        collectionRef: number
    }
>

export interface REQ_RENAME_PAGE {
    name: string
    id: number
}


export type RES_RENAME_PAGE =  Custom_API_RES<string>

export interface REQ_RENAME_COLLECTION {
    name: string
    id: number
}


export type RES_RENAME_COLLECTION =  Custom_API_RES<string>

export interface REQ_SAVE_PAGE {
    content: string
    id: number
}


export type RES_SAVE_PAGE =  Custom_API_RES<string>


export interface REQ_GET_PAGE {
    id: number
}

export type RES_GET_PAGE =  Custom_API_RES<PageType>