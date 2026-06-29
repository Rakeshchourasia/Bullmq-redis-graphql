import React from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client/core';
import Post from './Post';

const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      id
      title
      url
      status
    }
  }
`;

const Feed = () => {
  const { loading, error, data } = useQuery(GET_VIDEOS);

  if (loading) return <div className="text-center pt-10 text-gray-500">Loading videos...</div>;
  if (error) return <div className="text-center pt-10 text-red-500">Error: {error.message}</div>;

  const videos = data?.videos || [];

  return (
    <div className="w-full pt-8">
      {videos.length === 0 ? (
        <div className="text-center pt-10 text-gray-500">No videos found. Upload one to get started!</div>
      ) : (
        <div className="px-4 sm:px-0">
          {videos.map(video => (
            <Post key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
