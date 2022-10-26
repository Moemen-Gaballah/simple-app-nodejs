import { ListPostsRequest, ListPostsResponse } from "@codesquare/shared"

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000';

export const listPosts = async (req: ListPostsResponse): Promise<ListPostsRequest> => {
    const response = await fetch(`${HOST}/api/v1/posts`);
    if(!response.ok){
        const {error} = await response.json();
        throw error;
    }

    return response.json();
}