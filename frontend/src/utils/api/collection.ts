import {
  REQ_ADD_COLLECTION,
  REQ_ALL_COLLECTION_BY_PARENT_ID,
  REQ_COLLECTION_BY_ID,
  REQ_COLLECTION_BY_PARENT_ID, REQ_RENAME_PAGE,
  RES_ADD_COLLECTION,
  RES_ALL_COLLECTION_BY_PARENT_ID,
  RES_COLLECTION_BY_ID,
  RES_COLLECTION_BY_PARENT_ID, RES_RENAME_PAGE
} from '../types/api/collection_Types'
import axiosInstance from './axiosInterface'
import {Custom_API_RES} from "../types/api/common";

const ADD = async (data: REQ_ADD_COLLECTION): Promise<RES_ADD_COLLECTION> => {
  try {
    return await axiosInstance()
      .post('/auth/collection/add', data)
      .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error adding the collection: ${error}`)
  }
}

const Get_By_ID = async (data: REQ_COLLECTION_BY_ID): Promise<RES_COLLECTION_BY_ID> => {
  try {
    return await axiosInstance()
      .post('/auth/collection/getById', data)
      .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error fetching the collection by id: ${error}`)
  }
}

const Get_By_Parent_ID = async (data: REQ_COLLECTION_BY_PARENT_ID): Promise<RES_COLLECTION_BY_PARENT_ID> => {
  try {
    return await axiosInstance()
      .post('/auth/collection/getByParentId', data)
      .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error fetching the collection by parent id: ${error}`)
  }
}

const Get_All_By_Parent_ID = async (data: REQ_ALL_COLLECTION_BY_PARENT_ID): Promise<RES_ALL_COLLECTION_BY_PARENT_ID> => {
  try {
    return await axiosInstance()
      .post('/auth/collection/getAllByParentId', data)
      .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error fetching the collection by parent id: ${error}`)
  }
}

const RENAME = async (data: REQ_RENAME_PAGE): Promise<RES_RENAME_PAGE> => {
  try {
    return await axiosInstance()
        .post('/auth/collection/rename', data)
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error renaming the page: ${error}`)
  }
}

const DELETE = async (data: { id:number }): Promise<Custom_API_RES<string>> => {
  try {
    return await axiosInstance()
        .delete('/auth/collection/delete', {
          data
        })
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error deleting the page: ${error}`)
  }
}

const MOVE = async (data: { id:number , parent:number | null }): Promise<Custom_API_RES<string>> => {
  try {
    return await axiosInstance()
        .post('/auth/collection/moveById', 
          data
        )
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error deleting the page: ${error}`)
  }
}

const Get_All_By_Name = async (data: {name:string}): Promise<RES_ALL_COLLECTION_BY_PARENT_ID> => {
  try {
    return await axiosInstance()
        .post('/auth/collection/getAllByName', data)
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error fetching the collection by parent id: ${error}`)
  }
}

const COLLECTION_API = {
  ADD,
  Get_By_ID,
  Get_By_Parent_ID,
  Get_All_By_Parent_ID,
  RENAME,
  DELETE,
  MOVE,
  Get_All_By_Name
}
export default COLLECTION_API
