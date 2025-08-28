import React from 'react';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { usePosts } from '../hooks/usePosts';
import { Loader2 } from 'lucide-react';

export function Feed() {
  const { posts, loading, refreshPosts } = usePosts();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <CreatePost onPostCreated={refreshPosts} />
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}