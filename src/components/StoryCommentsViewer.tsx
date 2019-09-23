import * as React from 'react'
import { StoryConsumer } from './StoryContext';
import { IComment } from '../types/Stories';



const StoryCommentsViewer: React.FC = () => (
  <StoryConsumer>
    {({ state, goBack }) => {
      if (state.loading) {
        return <div>Loading...</div>
      }

      if (state.selectedStory) {
        return (
          <div>
            <div className="comment-wrapper ">
              <h2 className="story-title">{state.selectedStory.story.title}</h2>
              <button className="btn-view-comment" onClick={() => goBack()}>BACK</button>
            </div>
            <br />
            <CommentList comments={state.selectedStory.comments} />
          </div>
        )
      }
      return null
    }}
  </StoryConsumer>
)


type CommentListProps = {
  comments: IComment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <ol>{comments.map((c: IComment) => <CommentItem key={c.id} comment={c} />)}</ol>
)




type CommentProps = {
  comment: IComment
}

const CommentItem: React.FC<CommentProps> = ({ comment }) => (
  <li className="comment-item">
    <span> by: {comment.by}</span>
    <div className="comment-item-text" dangerouslySetInnerHTML={{ __html: comment.text }} />
  </li>
)


export default StoryCommentsViewer