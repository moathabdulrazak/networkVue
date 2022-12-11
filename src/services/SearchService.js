import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"





class SearchService {


  // async search(search) {


  //   const res = await api.get('api/profiles', { params: search })
  //   AppState.searchProfiles = res.data
  //   AppState.nextPage = res.data.older
  //   AppState.previousPage = res.data.newer
  // }

}





export const searchService = new SearchService()