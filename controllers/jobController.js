import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query;
    const queryObject = {
        createdBy: req.user.userId,
    };
    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
    }
    
    const jobs = await Job.find(queryObject);
    res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
    console.log(req.body);
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ job: removedJob });
};

export const showStats = async (req, res) => {
    // Begin an asynchronous function to handle the stats request
    let stats = await Job.aggregate([
        // Use MongoDB's aggregation framework to get stats for jobs created by the current user
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        // Group the jobs by 'jobStatus' (e.g., pending, interview, declined) and count how many of each status
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    // Transform the array of stats into an object where each job status is a key and the count is its value
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        // Assign the count for each status (e.g., { pending: 5, interview: 2 }) to the accumulator
        acc[title] = count;
        return acc;
    }, {});

    // Provide default values if certain statuses are not present in the stats
    const defaultStats = {
        pending: stats.pending || 0, // Use 0 if 'pending' is not found
        interview: stats.interview || 0, // Use 0 if 'interview' is not found
        declined: stats.declined || 0, // Use 0 if 'declined' is not found
    };

    // Fetch job application stats grouped by year and month (limit to last 6 months)
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        // Group by year and month of job creation and count the number of jobs per month
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        // Sort the results in descending order of year and month
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        // Limit the results to the last 6 months
        { $limit: 6 },
    ]);

    // Map the aggregation results into an array of formatted month names and job counts
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            // Create a human-readable date format using the 'dayjs' library
            const date = day()
                .month(month - 1) // Convert month (1-based index) to zero-based for dayjs
                .year(year)
                .format('MMM YY'); // Format the date as 'Jan 24' (Month Year)
            return { date, count }; // Return the formatted date and the job count for that month
        })
        .reverse(); // Reverse the array to show the oldest month first

    // Send the response back to the client with status code 200 (OK)
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
    // The response includes default stats (for job statuses) and monthly applications (for the last 6 months)
};