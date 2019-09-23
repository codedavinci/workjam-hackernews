
import { Reducer } from 'react'
import { IItem, IStory, IFocusedStory, IComment } from "../../types/Stories";
import { StoryActions, StoryTypeKeys } from "../actions/storyAction";




export interface IStoryState {
  stories: IStory[],
  loading: boolean,
  error: Error | null,
  selectedStory: IFocusedStory | undefined
}

export const initialState = {
  stories: [],
  loading: false,
  error: null,
  selectedStory: undefined
}


const normalizeComments = (comments: IItem[]): IComment[] => {
  return comments.reduce((acc: IComment[], val: IItem): IComment[] => {
    let { by, id, text, time } = val

    let normalizedComments = {
      by, id, text, time
    } as IComment

    acc.push(normalizedComments)

    return acc
  }, [])
}


const normalizeStories = (stories: IItem[]): IStory[] => {
  return stories.reduce((acc: IStory[], val: IItem): IStory[] => {
    let { by, id, kids, score, time, title, url } = val

    let normalizedStory = {
      by,
      id,
      score,
      time,
      title,
      url,
      commentIds: kids
    } as IStory

    acc.push(normalizedStory)

    return acc
  }, [])
}

export const storyReducer: Reducer<IStoryState, StoryActions> = (
  state = initialState,
  action
): IStoryState => {
  switch (action.type) {
    case StoryTypeKeys.BEGIN:
      return {
        ...state,
        loading: true
      }
    case StoryTypeKeys.SUCCESS_STORY:
      return {
        ...state,
        loading: false,
        stories: [...normalizeStories(action.items)]
      }
    case StoryTypeKeys.SUCCESS_COMMENT:
      return {
        ...state,
        loading: false,
        selectedStory: {
          story: action.payload.story,
          comments: [...normalizeComments(action.payload.comments)]
        } as IFocusedStory
      }

    case StoryTypeKeys.BACK:
      return {
        ...state,
        selectedStory: undefined
      }
    case StoryTypeKeys.FAIL:
      return {
        ...state,
        error: action.error
      }
  }

  return state
}