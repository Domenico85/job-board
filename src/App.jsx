import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Clock, DollarSign, Users, Plus, Filter, Send, ArrowLeft } from 'lucide-react';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [applications, setApplications] = useState({});
  
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    jobType: ''
  });

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    industry: '',
    jobType: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Sales', 'Manufacturing'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'];
  const locations = ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Austin', 'Seattle', 'Remote'];

  // Sample initial jobs
  useEffect(() => {
    const sampleJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco',
        industry: 'Technology',
        jobType: 'Full-time',
        salary: '$120,000 - $150,000',
        description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features and ensuring excellent user experience.',
        requirements: 'Bachelor\'s degree in Computer Science, 5+ years React experience, JavaScript proficiency',
        benefits: 'Health insurance, 401k matching, flexible work hours, remote work options',
        postedDate: '2 days ago'
      },
      {
        id: 2,
        title: 'Digital Marketing Manager',
        company: 'Creative Solutions',
        location: 'New York',
        industry: 'Marketing',
        jobType: 'Full-time',
        salary: '$80,000 - $100,000',
        description: 'Lead our digital marketing initiatives and drive brand awareness across multiple channels.',
        requirements: '3+ years digital marketing experience, Google Ads certification, Analytics expertise',
        benefits: 'Health insurance, paid time off, professional development budget',
        postedDate: '1 week ago'
      },
      {
        id: 3,
        title: 'UX Designer',
        company: 'Design Studio',
        location: 'Remote',
        industry: 'Design',
        jobType: 'Contract',
        salary: '$70 - $90/hour',
        description: 'Create intuitive and engaging user experiences for our client projects.',
        requirements: 'Portfolio demonstrating UX/UI skills, Figma proficiency, user research experience',
        benefits: 'Flexible schedule, project-based work, creative freedom',
        postedDate: '3 days ago'
      }
    ];
    setJobs(sampleJobs);
    setFilteredJobs(sampleJobs);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesIndustry = !filters.industry || job.industry === filters.industry;
      const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
      
      return matchesSearch && matchesLocation && matchesIndustry && matchesJobType;
    });
    
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filters]);

  const handlePostJob = () => {
    if (newJob.title && newJob.company && newJob.location && newJob.industry && newJob.jobType && newJob.description) {
      const jobWithId = {
        ...newJob,
        id: Date.now(),
        postedDate: 'Just now'
      };
      setJobs([jobWithId, ...jobs]);
      setNewJob({
        title: '',
        company: '',
        location: '',
        industry: '',
        jobType: '',
        salary: '',
        description: '',
        requirements: '',
        benefits: ''
      });
      setShowPostJob(false);
    }
  };

  const handleApply = (jobId) => {
    setApplications(prev => ({
      ...prev,
      [jobId]: true
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      industry: '',
      jobType: ''
    });
  };

  if (showPostJob) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setShowPostJob(false)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={newJob.industry}
                    onChange={(e) => setNewJob({...newJob, industry: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={newJob.jobType}
                    onChange={(e) => setNewJob({...newJob, jobType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. $80,000 - $120,000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  rows={4}
                  value={newJob.description}
                  onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role and responsibilities..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                <textarea
                  rows={3}
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Required skills and qualifications..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <textarea
                  rows={3}
                  value={newJob.benefits}
                  onChange={(e) => setNewJob({...newJob, benefits: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Benefits and perks offered..."
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handlePostJob}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Post Job
                </button>
                <button
                  onClick={() => setShowPostJob(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      {selectedJob.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedJob.postedDate}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {selectedJob.industry}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {selectedJob.jobType}
                </span>
                {selectedJob.salary && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {selectedJob.salary}
                  </span>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>
                
                {selectedJob.requirements && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.requirements}</p>
                  </div>
                )}
                
                {selectedJob.benefits && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.benefits}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                {applications[selectedJob.id] ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Send className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Application Submitted!
                        </p>
                        <p className="text-sm text-green-700">
                          Your application has been sent to {selectedJob.company}. They will review it and get back to you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    className="w-full sm:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                  >
                    Apply for this Job
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
               <img className='logo' src="/favicon.gif" alt="" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">JobBoard Pro</h1>
              <p className="text-gray-600">Find your dream job today</p>
            </div>
            <button
              onClick={() => setShowPostJob(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus className="w-4 h-4" />
              Post Job
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filters.location || filters.industry || filters.jobType) && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[filters.location, filters.industry, filters.jobType].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={filters.industry}
                    onChange={(e) => setFilters({...filters, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div
                key={job.id}
                className="job-box cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.postedDate}
                      </div>
                    </div>
                  </div>
                  {applications[job.id] && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Applied
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {job.industry}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {job.jobType}
                  </span>
                  {job.salary && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 line-clamp-2 mb-4">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    View Details →
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(job.id);
                    }}
                    disabled={applications[job.id]}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      applications[job.id]
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {applications[job.id] ? 'Applied' : 'Quick Apply'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;