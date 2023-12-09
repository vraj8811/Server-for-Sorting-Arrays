const express = require('express');
const router = express.Router();

// Sequential sorting function
function sequentialSort(arr) {
    return arr.map(subArray => subArray.slice().sort((a, b) => a - b));
}

// Concurrent sorting function
async function concurrentSort(arr) {
    const promises = arr.map(subArray => {
        return new Promise(resolve => {
            resolve(subArray.slice().sort((a, b) => a - b));
        });
    });

    return Promise.all(promises);
}

// End point for Sequential sorting function
router.post('/process-single', (req, res) => {
    const { to_sort } = req.body;

    const start = performance.now();
    const sortedArrays = sequentialSort(to_sort);
    const elapsed = performance.now() - start;

    res.json({
        sorted_arrays: sortedArrays,
        time_ns: elapsed * 1e6, // Convert to nanoseconds
    });
});

// End point for Concurrent sorting function
router.post('/process-concurrent', async (req, res) => {
    const { to_sort } = req.body;

    const start = performance.now();
    const sortedArrays = await concurrentSort(to_sort);
    const elapsed = performance.now() - start;

    res.json({
        sorted_arrays: sortedArrays,
        time_ns: elapsed * 1e6, // Convert to nanoseconds
    });
});

module.exports = router