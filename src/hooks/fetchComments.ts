import { BeginFetchStories, FailFetchStory, SuccessFetchComments } from "../state/actions/storyAction";
import { IStory, IItem } from "../types/Stories";
import { fetchItem } from "./useShared";



const fetchComments = async (story: IStory, dispatch: Function) => {
  dispatch(BeginFetchStories())

  try {
    const comments: IItem[] = await Promise.all(
      story.commentIds.map(async (commentid: number) => {
        let comment = await fetchItem(commentid)
        return comment
      }))

    dispatch(SuccessFetchComments(story, comments))

  } catch (error) {
    dispatch(FailFetchStory(error))
  }
}




export default fetchComments
