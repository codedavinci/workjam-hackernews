import * as React from 'react'
import { StoryConsumer } from './StoryContext';
import { IStory } from '../types/Stories';

const StoryList: React.FC = () => (

  <StoryConsumer>
    {({ state, getComments }) => {
      if (state.loading) {
        return <div>Loading...</div>
      }

      return <ol className="story-list-wrapper">
        {state.stories.map((s: IStory) => (
          <StoryItem
            key={s.id}
            onClick={getComments}
            story={s}
          />
        ))}
      </ol>
    }}
  </StoryConsumer>

)

type StoryItemProps = {
  onClick: Function
  story: IStory
}

const StoryItem: React.FC<StoryItemProps> = ({ onClick, story }) => {

  // eslint-disable-next-line 
  const length = story && story.commentIds && story.commentIds.length || 0

  return (
    <li className="story-item-wrapper">
      <div className="story-link">
        <a href={story.url} target="_blank" rel="noopener noreferrer" >{story.title}</a>
      </div>
      <button className="btn-view-comment" onClick={() => onClick(story)}>({length}) View Comments </button>

    </li>
  )
}

export default StoryList