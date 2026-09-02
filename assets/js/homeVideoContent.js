import React from "react";
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player';

function HomeVideoContent() {
    return (
      <div>
          <div id="reactPlayer1">
             <ReactPlayer
                   class="video_frame"
                   width="1950" height="1200"
                   url="https://vimeo.com/879766968" controls={true}
                   onPlay={() => console.log('video is playing')} onPause={() => console.log('video is paused')}
                   onProgress={(state) => {
                      checkState(state);
                   }}
              />
          </div>
      </div>
    );
}

export default HomeVideoContent;