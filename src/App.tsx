import React from 'react';
import './App.css';
import { StoryConsumer } from './components/StoryContext';
import StoryList from './components/StoryList';
import StoryCommentsViewer from './components/StoryCommentsViewer';




const App: React.FC = () => {
  return (
    <StoryConsumer>
      {({ state }) => {
        return (
          <main className="App">
            <header className="App-header"> <strong>WORKJAM</strong> <i>THINGY</i> </header>
            {state.selectedStory ? <StoryCommentsViewer /> : <StoryList />}
          </main>
        )

      }}

    </StoryConsumer>

  );
}

export default App
