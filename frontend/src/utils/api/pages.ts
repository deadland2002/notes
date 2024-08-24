import {
  REQ_ADD_PAGE,
  REQ_GET_PAGE,
  REQ_RENAME_PAGE, REQ_SAVE_PAGE,
  RES_ADD_PAGE,
  RES_GET_PAGE,
  RES_RENAME_PAGE, RES_SAVE_PAGE
} from '../types/api/collection_Types'
import axiosInstance from './axiosInterface'
import {Custom_API_RES} from "../types/api/common";

const ADD = async (data: REQ_ADD_PAGE): Promise<RES_ADD_PAGE> => {
  try {
    return await axiosInstance()
      .post('/auth/page/add', data)
      .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error adding the page: ${error}`)
  }
}

const RENAME = async (data: REQ_RENAME_PAGE): Promise<RES_RENAME_PAGE> => {
  try {
    return await axiosInstance()
        .post('/auth/page/rename', data)
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error renaming the page: ${error}`)
  }
}

const SAVE = async (data: REQ_SAVE_PAGE): Promise<RES_SAVE_PAGE> => {
  try {
    return await axiosInstance()
        .post('/auth/page/save', data)
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error saving the page: ${error}`)
  }
}

const GET = async (data: REQ_GET_PAGE): Promise<RES_GET_PAGE> => {
  try {
    return await axiosInstance()
        .post('/auth/page/getById', data)
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error saving the page: ${error}`)
  }
}

const DELETE = async (data: { id:number }): Promise<Custom_API_RES<string>> => {
  try {
    return await axiosInstance()
        .delete('/auth/page/delete',{
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
        .post('/auth/page/moveById',
            data
        )
        .then((res) => res.data)
  } catch (error) {
    throw new Error(`Error deleting the page: ${error}`)
  }
}

const PAGES_API = {
  ADD,
  RENAME,
  GET,
  SAVE,
  DELETE,
  MOVE
}
export default PAGES_API
