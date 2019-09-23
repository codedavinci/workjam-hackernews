import { useEffect, useReducer, Reducer } from "react";
import { IStoryState, storyReducer } from '../state/reducers/storyReducer'
import { StoryActions, BeginFetchStories, SuccessFetchStories, FailFetchStory } from "../state/actions/storyAction";
import { IItem } from "../types/Stories";
import { ENDPOINT, fetchItem } from "./useShared";




const useFetchTopStories = (top: number): [IStoryState, Function] => {
  const initialState: IStoryState = { stories: [], loading: false, error: null, selectedStory: undefined }

  const [state, dispatch] = useReducer<Reducer<IStoryState, StoryActions>>(storyReducer, initialState)

  useEffect(() => {
    const fetchStories = async () => {
      dispatch(BeginFetchStories())

      try {
        const res = await fetch(`${ENDPOINT}/topstories.json?orderBy="$key"&limitToFirst=${top}`)
        const storyIds = await res.json()

        const items: IItem[] = await Promise.all(
          storyIds.map(async (storyid: number) => {
            let story = await fetchItem(storyid)
            return story
          }))

        dispatch(SuccessFetchStories(items))

      } catch (error) {
        dispatch(FailFetchStory(error))
      }
    }

    fetchStories()
  }, [top])



  return [state, dispatch]

}

export default useFetchTopStories