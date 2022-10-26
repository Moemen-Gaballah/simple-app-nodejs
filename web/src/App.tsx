// import {useEffect, useState} from "react";
import {ListPostsResponse} from '@codesquare/shared';
import {useQuery} from "@tanstack/react-query";
import {listPosts} from "./client";

export const App = () => {
  // const [posts, setPosts] = useState<Post[]>();
  // useEffect(() => {
  //   fetch(`${HOST}/api/v1/posts`).then(res => res.json()).then(response => setPosts(response.posts));
  // }, []);

  const { data, error, isLoading } = useQuery<ListPostsResponse>(['listposts'], listPosts);

  if(isLoading){
    return <div>loading...</div>;
  }

  if(error){
    return <div>error loading posts</div>;
  }

  return (<div>
    Posts:
    {!!data?.posts && (
        <div>{JSON.stringify(data.posts)}</div>
    )}
  </div>);

  // return data?.posts.length > 0 ? <div>{JSON.stringify(posts)}</div> : <div>No posts</div> ;

}