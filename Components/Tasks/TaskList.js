import { deleteTask, fetchTasks } from "@/features/task/taskSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskList = () => {
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [activePage, setActivePage] = React.useState(1);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTasks(activePage)); // Fetch tasks for the active page
  }, [dispatch, activePage]); // Add activePage to dependency array

  const handleDelete = async (taskId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirm) {
      await dispatch(deleteTask(taskId));
      dispatch(fetchTasks(activePage)); // Fetch tasks again after deletion
    }
  };

  const handleTaskList = (taskId) => {
    router.push(`/tasklist/${taskId}`);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber); // Update active page state
    dispatch(fetchTasks(pageNumber)); // Fetch tasks for the new page
  };

  const getPaginationItems = (currentPage, totalPages) => {
    const paginationItems = [];
    const siblingCount = 3;

    // Always show the first page
    paginationItems.push(1);

    // Show ellipsis if there are pages before the first displayed page
    if (currentPage > siblingCount + 2) {
      paginationItems.push("...");
    }

    // Calculate the start and end pages to show
    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add pages from startPage to endPage
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(i);
    }

    // Show ellipsis if there are pages after the last displayed page
    if (currentPage < totalPages - siblingCount - 1) {
      paginationItems.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      paginationItems.push(totalPages);
    }

    return paginationItems;
  };

  return (
    <div>
      <h4>Tasks List</h4>
      <div className="card p-2">
        <div className="card-body">
          {/* Pagination */}
          <div className="text-center">
            {tasks?.data?.totalPages > 1 && (
              <nav>
                <ul className="pagination">
                  {getPaginationItems(activePage, tasks?.data.totalPages).map(
                    (pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          activePage === pageNumber ? "active" : ""
                        }`}
                      >
                        {pageNumber === "..." ? (
                          <span className="page-link">{pageNumber}</span>
                        ) : (
                          <a
                            onClick={() => handlePageChange(pageNumber)} // Use handlePageChange for pagination
                            className={`page-link ${
                              activePage === pageNumber
                                ? "text-white bg-primary"
                                : ""
                            }`} // Active color for the current page
                          >
                            {pageNumber}
                          </a>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </nav>
            )}
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Task Type</th>
                <th>Count</th>
                <th>URL</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.data?.tasks?.map((task) => (
                <tr key={task.id}>
                  <td>{task?.type}</td>
                  <td>{task?.count}</td>
                  <td>
                    <small>{task?.url}</small>
                  </td>
                  <td>
                    {task?.status === "pending" ? (
                      <b className="text-warning">Pending</b>
                    ) : task?.status === "completed" ? (
                      <b className="text-success">Completed</b>
                    ) : (
                      <b className="text-danger">Failed</b>
                    )}
                  </td>
                  <td>{new Date(task?.createdAt).toLocaleString()}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleTaskList(task.id)}
                    >
                      TaskList
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          
        </div>
      </div>
    </div>
  );
};

export default TaskList;
