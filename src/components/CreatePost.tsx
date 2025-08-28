import React, { useState } from 'react';
import { Image, Send, X } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';

interface CreatePostProps {
  onPostCreated?: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { createPost } = usePosts();
  const { profile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await createPost(content, imageUrl || undefined);
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
      onPostCreated?.();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-medium">
            {profile?.name?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />

            {showImageInput && (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl('');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {imageUrl && (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full rounded-lg object-cover max-h-64"
                  onError={() => setImageUrl('')}
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Image className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {isLoading ? 'Posting...' : 'Post'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}