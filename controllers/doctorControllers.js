const Patient = require('../models/patient');

module.exports.search_patient = async (req, res) => {
  const healthID = req.params.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong...' });
  }
};

module.exports.photo = async (req, res) => {
  try {
    const { healthID, report } = req.params;

    const patient = await Patient.findOne({ healthID });

    if (patient.reports[report]) {
      res.set('Content-Type', patient.reports[report].contentType);
      res.send(patient.reports[report].data);
    }
  } catch (err) {
    return res.status(400).json({
      error,
    });
  }
};

module.exports.get_doctor = async (req, res) => {
  let doctor = req.doctor;
  res.status(200).json({ doctor });
};
