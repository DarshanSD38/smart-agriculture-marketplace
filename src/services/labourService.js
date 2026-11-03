import { api } from './api';
import { INITIAL_LABOURERS, INITIAL_JOBS } from '../data/mockData';

const LABOUR_KEY = 'agrismart_labourers';
const JOBS_KEY = 'agrismart_jobs';

const getLocalLabourers = () => {
  const data = localStorage.getItem(LABOUR_KEY);
  if (!data) {
    localStorage.setItem(LABOUR_KEY, JSON.stringify(INITIAL_LABOURERS));
    return INITIAL_LABOURERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_LABOURERS;
  }
};

const getLocalJobs = () => {
  const data = localStorage.getItem(JOBS_KEY);
  if (!data) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_JOBS;
  }
};

export const labourService = {
  getAllLabourers: async () => {
    try {
      const res = await api.get('/labour/labourers');
      if (res.success && res.labourers) {
        return res.labourers;
      }
    } catch (err) {
      console.warn('[LabourService] Backend offline, fetching labourers locally');
    }
    return getLocalLabourers();
  },

  getLabourerById: async (id) => {
    try {
      const res = await api.get(`/labour/labourers/${id}`);
      if (res.success && res.labourer) {
        return res.labourer;
      }
    } catch (err) {
      console.warn(`[LabourService] Backend offline, finding labourer ${id} locally`);
    }
    const list = getLocalLabourers();
    return list.find(l => l.id === id || l._id === id) || null;
  },

  filterLabourers: async ({ skill = 'All', location = 'All', availability = 'All' }) => {
    try {
      const res = await api.get('/labour/labourers', {
        skill: skill !== 'All' ? skill : undefined,
        location: location !== 'All' ? location : undefined,
        availability: availability !== 'All' ? availability : undefined
      });
      if (res.success && res.labourers) {
        return res.labourers;
      }
    } catch (err) {
      console.warn('[LabourService] Backend offline, filtering locally');
    }

    let list = getLocalLabourers();
    if (skill && skill !== 'All') {
      list = list.filter(l => l.skills.some(s => s.toLowerCase().includes(skill.toLowerCase())));
    }
    if (location && location !== 'All') {
      list = list.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (availability && availability !== 'All') {
      list = list.filter(l => l.availability.toLowerCase().includes(availability.toLowerCase()));
    }
    return list;
  },

  getAllJobs: async () => {
    try {
      const res = await api.get('/labour/jobs');
      if (res.success && res.jobs) {
        return res.jobs;
      }
    } catch (err) {
      console.warn('[LabourService] Backend offline, fetching jobs locally');
    }
    return getLocalJobs();
  },

  createJob: async (jobData) => {
    try {
      const res = await api.post('/labour/jobs', jobData);
      if (res.success && res.job) {
        const local = getLocalJobs();
        localStorage.setItem(JOBS_KEY, JSON.stringify([res.job, ...local]));
        return res.job;
      }
    } catch (err) {
      console.warn('[LabourService] Backend offline, creating job locally');
    }

    const jobs = getLocalJobs();
    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      farmerId: 'f-1',
      farmerName: 'Ramesh Patel',
      workersApplied: 0,
      status: 'Open'
    };
    const updated = [newJob, ...jobs];
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    return newJob;
  },

  applyForJob: async (jobId) => {
    try {
      const res = await api.post(`/labour/jobs/${jobId}/apply`);
      if (res.success) {
        return true;
      }
    } catch (err) {
      console.warn('[LabourService] Backend offline, applying locally');
    }

    const jobs = getLocalJobs();
    const updated = jobs.map(j => {
      if (j.id === jobId || j._id === jobId) {
        return {
          ...j,
          workersApplied: (j.workersApplied || 0) + 1,
          hasApplied: true
        };
      }
      return j;
    });
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    return true;
  }
};
