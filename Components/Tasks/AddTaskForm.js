import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, fetchTasks } from "@/features/task/taskSlice";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [taskType, setTaskType] = useState("");
  const [count, setCount] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState(""); // New state for title

  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = {
        
        count: parseInt(count),
        keyword: keyword,
        url,
      };

      await dispatch(createTask(formData));
      dispatch(fetchTasks());
      setLoading(false);
      toast.success("Task created successfully");
      
      setCount("");
      setKeyword("");
      setUrl("");
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div>
        <label>Keyword:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          className="form-control mb-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Count:</label>
        <input
          type="number"
          className="form-control mb-3"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />
      </div>

      


      {!loading ? (
        <button type="submit" className="btn btn-primary mb-3">
          Submit Task
        </button>
      ) : (
        <button type="submit" className="btn btn-primary mb-3" disabled>
          Loading...
        </button>
      )}
    </form>
  );
};

export default AddTaskForm;
