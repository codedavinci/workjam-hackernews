import * as React from "react";
import useFetchTopStories from "../hooks/useFetchTopStories";
import { IStoryState, initialState } from "../state/reducers/storyReducer";
import { Noop, IStory } from "../types/Stories";
import fetchComments from "../hooks/fetchComments";
import { GoBackAction } from "../state/actions/storyAction";


let noop: Noop = () => { }

export interface IStoryContext {
  state: IStoryState,
  getComments: Function,
  goBack: Function
}

type Props = {
  children: React.ReactNode
}

const { Provider, Consumer } = React.createContext<IStoryContext>({
  state: initialState,
  getComments: noop,
  goBack: noop
})


const StoryProvider: React.SFC<Props> = ({ children }) => {

  const [state, dispatch] = useFetchTopStories(10)

  const getComments = async (story: IStory) => {
    await fetchComments(story, dispatch)
  }

  const goBack = () => {
    dispatch(GoBackAction())
  }

  return (
    <Provider value={{ state, getComments, goBack }}>
      {children}
    </Provider>
  )
}

export { StoryProvider, Consumer as StoryConsumer }


