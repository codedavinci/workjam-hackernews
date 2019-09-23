export interface IItem {
  by: string,
  id: number,
  kids: number[],
  parent?: number
  score?: number,
  time: number,
  title?: string,
  type: string,
  url?: string,
  text?: string,
}

export interface IStory {
  by: string,
  id: number,
  title: string,
  commentIds: number[]
  time: number,
  score: number,
  url: string
}


export interface IComment {
  by: string,
  id: number,
  text: string,
  time: number
}

export interface IFocusedStory {
  story: IStory,
  comments: IComment[]
}


export type Noop = () => void
