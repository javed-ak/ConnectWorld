import { useState, useEffect } from 'react';
import { Post } from '../types';
import { apiClient } from '../lib/api';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await apiClient.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (content: string, imageUrl?: string) => {
    const data = await apiClient.createPost(content, imageUrl);
    await fetchPosts(); // Refresh posts
    return data;
  };

  const toggleLike = async (postId: string) => {
    await apiClient.toggleLike(postId);
    await fetchPosts(); // Refresh posts
  };

  const addComment = async (postId: string, content: string) => {
    const data = await apiClient.addComment(postId, content);
    await fetchPosts(); // Refresh posts
    return data;
  };

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    addComment,
    refreshPosts: fetchPosts,
  };
}