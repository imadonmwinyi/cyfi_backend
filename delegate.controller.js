const Delegate = require('./Delegate');
const { Op } = require('sequelize');
// Save a new Delegate
exports.create = async (req, res) => {
  try {
    const delegate = await Delegate.create(req.body);
    res.status(201).json(delegate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Save multiple Delegates (Bulk Save)
exports.createBulk = async (req, res) => {
  try {
    // req.body should be an array of delegate objects
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Data must be an array of delegates." });
    }

    const delegates = await Delegate.bulkCreate(data);
    res.status(201).json({
      message: `${delegates.length} delegates saved successfully.`,
      data: delegates
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View all Delegates
// exports.findAll = async (req, res) => {
//   try {
//     const delegates = await Delegate.findAll();
//     res.json(delegates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.findAll = async (req, res) => {
  try {
    const { province, startDate, endDate, programType } = req.query;
    const whereClause = {};

    // 1. Filter by Province (Exact match)
    if (province) {
      whereClause.province = province;
    }

    // 2. Filter by Program Type
    if (programType) {
      whereClause.programType = programType; 
    }

    // 3. Filter by dateRegistered range
    if (startDate || endDate) {
      whereClause.dateRegistered = {};
      
      if (startDate) {
        whereClause.dateRegistered[Op.gte] = new Date(startDate); // Greater than or equal to
      }
      
      if (endDate) {
        // Sets time to 23:59:59 to include the entire end day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereClause.dateRegistered[Op.lte] = end; // Less than or equal to
      }
    }

    // Fetch filtered results
    const delegates = await Delegate.findAll({
      where: whereClause,
      order: [['dateRegistered', 'DESC']] // Optional: Shows newest registrations first
    });

    res.json(delegates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};