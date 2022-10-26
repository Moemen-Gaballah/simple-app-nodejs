// // import React from 'react';
//
// function App() {
//   return (
//       <div>Hello World!</div>
//   );
// }
//
// export default App;

import {useEffect, useState} from "react";
// import {Post} from '../../shared';
import {Post} from '@codesquare/shared';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/posts').then(res => res.json()).then(response => setPosts(response.posts));
  }, []);

  return (posts?.length || 0) > 0 ? <div>{JSON.stringify(posts)}</div> : <div>No posts</div> ;

}