import { fetchProfileList, deleteProfileById, updateProfileById } from "@/features/homepage/homepageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../utils/axiosInstance';
import toast from "react-hot-toast";

const ProfileLists = () => {
  const { profileData } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();

  const [editProfileId, setEditProfileId] = useState(null);
  const [editProfileData, setEditProfileData] = useState({});
  const [activePage, setActivePage] = useState(1); // Pagination state

  useEffect(() => {
    dispatch(fetchProfileList(activePage)); // Fetch list based on current page
  }, [dispatch, activePage]);

  const handleEdit = (profile) => {
    setEditProfileId(profile.id);
    setEditProfileData(profile);  // Populate the form with existing profile data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/api/profile/${editProfileId}`, editProfileData);
      setEditProfileId(null); // Exit edit mode
      dispatch(fetchProfileList(activePage)); // Refresh list for the current page
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this profile?");
    if (confirm) {
      try {
        const response = await axiosInstance.delete(`/api/profile/${id}`);
        dispatch(fetchProfileList(activePage)); // Refresh list for the current page
        toast.success(response?.message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page); // Set active page to the selected page
  };

  // Pagination logic
  const totalPages = profileData?.data?.totalPages || 0;
  const pagesToShow = 5;
  const firstPage = 1;
  const lastPage = totalPages;

  // Create the page numbers to display
  const paginationItems = [];

  if (totalPages <= pagesToShow) {
    // Show all pages if totalPages is less than or equal to pagesToShow
    for (let page = firstPage; page <= totalPages; page++) {
      paginationItems.push(page);
    }
  } else {
    if (activePage <= 3) {
      // If current page is in the beginning (1, 2, or 3)
      paginationItems.push(1, 2, 3, 4, 5);
      if (totalPages > 5) paginationItems.push('...');
    } else if (activePage > totalPages - 3) {
      // If current page is in the end (close to last page)
      paginationItems.push('...');
      for (let page = totalPages - 4; page <= totalPages; page++) {
        paginationItems.push(page);
      }
    } else {
      // If current page is in the middle
      paginationItems.push(1, '...');
      paginationItems.push(activePage - 1, activePage, activePage + 1);
      paginationItems.push('...', totalPages);
    }
  }

  return (
    <div>
      <h4>Profiles</h4>
      <div className="card p-2">
        <div className="card-body">
        <div className="d-flex justify-content-start">
            {/* <button 
              className="btn btn-secondary" 
              onClick={() => handlePageChange(firstPage)} 
              disabled={activePage === firstPage}
            >
              First
            </button> */}
            <button 
              className="btn btn-primary" 
              onClick={() => handlePageChange(activePage - 1)} 
              disabled={activePage === firstPage}
            >
              Previous
            </button>
            {paginationItems.map((item, index) => (
              <button 
                key={index} 
                className={`btn mx-1 ${activePage === item ? 'btn-secondary' : 'btn-primary'}`} 
                onClick={() => typeof item === 'number' && handlePageChange(item)}
                disabled={item === '...'}
              >
                {item}
              </button>
            ))}
            <button 
              className="btn btn-primary" 
              onClick={() => handlePageChange(activePage + 1)} 
              disabled={activePage === lastPage}
            >
              Next
            </button>
            {/* <button 
              className="btn btn-secondary" 
              onClick={() => handlePageChange(lastPage)} 
              disabled={activePage === lastPage}
            >
              Last
            </button> */}
          </div>
          <br />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Browser ID</th>
                <th>Upvote Allowed</th>
                <th>Downvote Allowed</th>
                <th>Comment Allowed</th>
                <th>Comment Upvote Allowed</th>
                <th>Post Allowed</th>
                <th>Subscribe Allowed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {profileData?.data?.profiles?.length ? (
                profileData.data.profiles.map((profile) => (
                  <tr key={profile.id}>
                    {editProfileId === profile.id ? (
                      <>
                        <td><input type="text" name="browserId" value={editProfileData.browserId} onChange={handleInputChange} /></td>
                        <td><input type="checkbox" name="upvoteAllowed" checked={editProfileData.upvoteAllowed} onChange={(e) => handleInputChange({ target: { name: 'upvoteAllowed', value: e.target.checked } })} /></td>
                        <td><input type="checkbox" name="downvoteAllowed" checked={editProfileData.downvoteAllowed} onChange={(e) => handleInputChange({ target: { name: 'downvoteAllowed', value: e.target.checked } })} /></td>
                        <td><input type="checkbox" name="commentAllowed" checked={editProfileData.commentAllowed} onChange={(e) => handleInputChange({ target: { name: 'commentAllowed', value: e.target.checked } })} /></td>
                        <td><input type="checkbox" name="commentUpvoteAllowed" checked={editProfileData.commentUpvoteAllowed} onChange={(e) => handleInputChange({ target: { name: 'commentUpvoteAllowed', value: e.target.checked } })} /></td>
                        <td><input type="checkbox" name="postAllowed" checked={editProfileData.postAllowed} onChange={(e) => handleInputChange({ target: { name: 'postAllowed', value: e.target.checked } })} /></td>
                        <td><input type="checkbox" name="subscribeAllowed" checked={editProfileData.subscribeAllowed} onChange={(e) => handleInputChange({ target: { name: 'subscribeAllowed', value: e.target.checked } })} /></td>
                        <td>
                          <button className="btn btn-success" onClick={handleUpdate}>Save</button>
                          <button className="btn btn-secondary" onClick={() => setEditProfileId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{profile.browserId}</td>
                        <td>{profile.upvoteAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>{profile.downvoteAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>{profile.commentAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>{profile.commentUpvoteAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>{profile.postAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>{profile.subscribeAllowed ? <b className="text-success">Yes</b> : <b className="text-danger">No</b>}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => handleEdit(profile)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => handleDelete(profile.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No profiles found</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination controls */}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileLists;
