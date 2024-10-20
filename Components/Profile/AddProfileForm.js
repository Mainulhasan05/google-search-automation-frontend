import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchProfileList } from "@/features/homepage/homepageSlice";

const animatedComponents = makeAnimated(); // Initialize animated components

// Options for react-select
const actionOptions = [
  { value: "upvote", label: "Upvote" },
  { value: "comment", label: "Comment" },
  { value: "downvote", label: "Downvote" },
  { value: "post", label: "Post" },
  { value: "commentUpvote", label: "Comment Upvote" },
  { value: "commentDownvote", label: "Comment Downvote" },
  { value: "subscribeAllowed", label: "Subscribe Allowed" },
];

const AddProfileForm = () => {
  const dispatch = useDispatch();
  const [browserId, setBrowserId] = useState(""); // Browser ID state
  const [actions, setActions] = useState([]); // Actions state (multi-select)
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      browserId,
      commentAllowed: actions.some((action) => action.value === "comment"),
      downvoteAllowed: actions.some((action) => action.value === "downvote"),
      upvoteAllowed: actions.some((action) => action.value === "upvote"),
      postAllowed: actions.some((action) => action.value === "post"),
      commentUpvoteAllowed: actions.some(
        (action) => action.value === "commentUpvote"
      ),
      commentDownvoteAllowed: actions.some(
        (action) => action.value === "commentDownvote"
      ),
      subscribeAllowed: actions.some(
        (action) => action.value === "subscribeAllowed"
      ),
    };

    try {
      setLoading(true);
      await axiosInstance.post("/api/profile", formData); // API call to add profile
      setLoading(false);
      dispatch(fetchProfileList());
      setBrowserId("");
      setActions([]);
      toast.success("Profile added successfully");
    } catch (error) {
      console.error("Error adding profile:", error);
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Profile</h5>

        <form onSubmit={handleSubmit}>
          {/* Browser ID Input */}
          <div className="mb-3">
            <label>Browser ID:</label>
            <input
              type="text"
              value={browserId}
              onChange={(e) => setBrowserId(e.target.value)}
              required
              className="form-control"
              placeholder="Enter Browser ID"
            />
          </div>

          {/* Actions (Multi-select with Animation) */}
          <div className="mb-3">
            <label>Actions:</label>
            <Select
              isMulti
              components={animatedComponents}
              closeMenuOnSelect={false}
              options={actionOptions}
              value={actions}
              onChange={setActions}
              placeholder="Select actions"
              className="form-control"
            />
          </div>

          {/* Submit Button */}
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProfileForm;
