import { IItem, IStory } from '../../types/Stories';

export enum StoryTypeKeys {
  BEGIN = "BEGIN_FETCH",
  SUCCESS_STORY = "SUCCESS_FETCH_STORY",
  SUCCESS_COMMENT = "SUCCESS_FETCH_COMMENT",
  FAIL = "FAIL_FETCHY",
  BACK = "GO_BACK"
}


interface IBeginAction { type: StoryTypeKeys.BEGIN }
interface ISuccessStoryAction { type: StoryTypeKeys.SUCCESS_STORY; items: IItem[] }
interface ISuccessCommentAction { type: StoryTypeKeys.SUCCESS_COMMENT; payload: { comments: IItem[], story: IStory } }
interface IFailAction { type: StoryTypeKeys.FAIL; error: Error }
interface IBackAction { type: StoryTypeKeys.BACK }


export const GoBackAction = (): IBackAction => ({ type: StoryTypeKeys.BACK })
export const BeginFetchStories = (): IBeginAction => ({ type: StoryTypeKeys.BEGIN })

export const SuccessFetchStories = (items: IItem[]): ISuccessStoryAction => ({
  type: StoryTypeKeys.SUCCESS_STORY,
  items
})

export const FailFetchStory = (error: Error): IFailAction => ({
  type: StoryTypeKeys.FAIL,
  error
})

export const SuccessFetchComments = (story: IStory, comments: IItem[]): ISuccessCommentAction => ({
  type: StoryTypeKeys.SUCCESS_COMMENT,
  payload: { comments, story }
})


export type StoryActions =
  IBeginAction |
  ISuccessStoryAction |
  IFailAction |
  ISuccessCommentAction |
  IBackAction