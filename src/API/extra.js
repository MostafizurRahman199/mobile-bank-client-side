
  // Post job application
  const postJobApplication = async (data) => {
    try {
      const response = await api.post(`/job-applications`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  // Post job application


  // Get applied jobs
  const getAppliedJob = async (email) => {
    try {
      const response = await api.get(`/applied-job/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Delete applied job
  const deleteAppliedJob = async (id, jobId) => {
    try {
      const response = await api.delete(`/applied-job/${id}?jobId=${jobId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };








  // Post a job
  const postAddJob = async (data) => {
    try {
      const response = await api.post(`/addJob`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Save a job
  const saveJob = async (data) => {
    try {
      const response = await api.post(`/saveJob`, data);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Get saved jobs
  const getMySavedJobs = async (email) => {
    try {
      const response = await api.get(`/saveJob/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  
  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };


  // Fetch my posted job
  const myJobPost = async (email) => {
    try {
      const response = await api.get(`/jobs/${email}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };




  // Fetch job application by ID
  const getJobApplication = async (jobId) => {
    try {
      const response = await api.get(`/viewJobApplication/${jobId}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Update job application status
  const updateJobApplicationStatus = async (id, statusData) => {
    try {
      const response = await api.patch(`/jobApplication-view/${id}`, { statusData });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Delete my job post
  const deleteMyJobPost = async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch all jobs
  const allJob = async () => {
    try {
      const response = await api.get("/allJob");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch job details by ID
  const fetchJobDetails = async (id) => {
    try {
      const response = await api.get(`/jobDetails/${id}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  // Update job post
  const updateJobPost = async (updatedData, id) => {
    try {
      const response = await api.put(`/jobs/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating job post with ID: ${id}`, error);
      throw error;
    }
  };