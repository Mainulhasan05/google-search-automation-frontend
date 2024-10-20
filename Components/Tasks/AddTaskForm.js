import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, fetchTasks } from '@/features/task/taskSlice';
import toast from 'react-hot-toast';

const AddTaskForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [taskType, setTaskType] = useState('');
  const [count, setCount] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState(''); // New state for title

  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Merging title and content for the 'Post' task
      const mergedContent = taskType === 'post' ? `${title}=title${content}` : content;

      const formData = {
        type: taskType,
        count: parseInt(count),
        content: taskType === 'comment' || taskType === 'post' ? mergedContent : '', // For comment and post types
        url,
      };

      await dispatch(createTask(formData));
      dispatch(fetchTasks());
      setLoading(false);
      toast.success('Task created successfully');
      // Reset form fields
      setTaskType('');
      setCount('');
      setContent('');
      setUrl('');
      setTitle(''); // Reset title
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='card p-3'>
      <div>
        <label>Task Type:</label>
        <select
          className='form-control mb-3'
          value={taskType}
          onChange={handleTaskTypeChange}
          required
        >
          <option value="">Select Task Type</option>
          <option value="comment">Comment</option>
          <option value="upvote">Upvote</option>
          <option value="downvote">Downvote</option>
          <option value="commentUpvote">Comment Upvote</option>
          <option value="commentDownvote">Comment Downvote</option>
          <option value="subscribe">Subscribe</option>
          <option value="post">Post</option>
        </select>
      </div>

      <div>
        <label>Count:</label>
        <input
          type="number"
          className='form-control mb-3'
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />
      </div>

      {/* Conditionally show content for 'comment' */}
      {taskType === 'comment' && (
        <div>
          <label>Content:</label>
          <textarea
            className='form-control mb-3'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
      )}

      {/* Conditionally show title and content for 'post' */}
      {taskType === 'post' && (
        <>
          <div>
            <label>Title:</label>
            <input
              type="text"
              className='form-control mb-3'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              className='form-control mb-3'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div>
        <label>URL:</label>
        <input
          type="url"
          className='form-control mb-3'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      {!loading ? (
        <button type="submit" className='btn btn-primary mb-3'>
          Submit Task
        </button>
      ) : (
        <button type="submit" className='btn btn-primary mb-3' disabled>
          Loading...
        </button>
      )}
    </form>
  );
};

export default AddTaskForm;
