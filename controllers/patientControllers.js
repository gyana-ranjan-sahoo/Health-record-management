const formidable = require('formidable');
const Patient = require('../models/patient');
const fs = require('fs');

module.exports.preview_prescription = async (req, res) => {
  const id = req.params.id;
  const healthID = req.patient.healthID;
  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription });
  } catch (err) {
    res.status(404).json({ error: 'Something went wrong...' });
  }
};

module.exports.upload_reports = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Photo could not be uploaded',
      });
    }

    console.log('files', Object.keys(files).length);

    // save to db
    try {
      console.log('lets update!');

      const patient = req.patient;

      // handle files - max 5mb
      if (files.blood_test) {
        // console.log('Yo blood test!');
        if (files.blood_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.blood_test.data = fs.readFileSync(
          files.blood_test.filepath
        );
        patient.reports.blood_test.contentType = files.blood_test.mimetype;
      }

      // mri
      if (files.MRI) {
        // console.log('Yo MRI test!');
        if (files.MRI.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.MRI.data = fs.readFileSync(files.MRI.filepath);
        patient.reports.MRI.contentType = files.MRI.mimetype;
      }

      // allergy test
      if (files.allergy_test) {
        console.log('Yo MRI test!');
        if (files.allergy_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.allergy_test.data = fs.readFileSync(
          files.allergy_test.filepath
        );
        patient.reports.allergy_test.contentType = files.allergy_test.mimetype;
      }

      // blood sugar test
      if (files.blood_sugar_test) {
        // console.log('Yo MRI test!');
        if (files.blood_sugar_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.blood_sugar_test.data = fs.readFileSync(
          files.blood_sugar_test.filepath
        );
        patient.reports.blood_sugar_test.contentType =
          files.blood_sugar_test.mimetype;
      }

      // ct scan test
      if (files.ct_scan_test) {
        // console.log('Yo MRI test!');
        if (files.ct_scan_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.ct_scan_test.data = fs.readFileSync(
          files.ct_scan_test.filepath
        );
        patient.reports.ct_scan_test.contentType = files.ct_scan_test.mimetype;
      }

      // dna test
      if (files.DNA_test) {
        // console.log('Yo MRI test!');
        if (files.DNA_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.DNA_test.data = fs.readFileSync(
          files.DNA_test.filepath
        );
        patient.reports.DNA_test.contentType = files.DNA_test.mimetype;
      }

      // ECG test
      if (files.ECG_test) {
        // console.log('Yo MRI test!');
        if (files.ECG_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.ECG_test.data = fs.readFileSync(
          files.ECG_test.filepath
        );
        patient.reports.ECG_test.contentType = files.ECG_test.mimetype;
      }

      // tb test
      if (files.TB_test) {
        // console.log('Yo MRI test!');
        if (files.TB_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.TB_test.data = fs.readFileSync(files.TB_test.filepath);
        patient.reports.TB_test.contentType = files.TB_test.mimetype;
      }

      // thyroid test
      if (files.thyroid_test) {
        // console.log('Yo MRI test!');
        if (files.thyroid_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.thyroid_test.data = fs.readFileSync(
          files.thyroid_test.filepath
        );
        patient.reports.thyroid_test.contentType = files.thyroid_test.mimetype;
      }

      // vitamin test
      if (files.vitamin_test) {
        // console.log('Yo MRI test!');
        if (files.vitamin_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.vitamin_test.data = fs.readFileSync(
          files.vitamin_test.filepath
        );
        patient.reports.vitamin_test.contentType = files.vitamin_test.mimetype;
      }

      // xray test
      if (files.xray_test) {
        // console.log('Yo MRI test!');
        if (files.xray_test.size > 1024 * 1024 * 5) {
          return res.status(400).json({
            error: 'File size is too big',
          });
        }

        patient.reports.xray_test.data = fs.readFileSync(
          files.xray_test.filepath
        );
        patient.reports.xray_test.contentType = files.xray_test.mimetype;
      }

      await patient.save();

      return res.status(200).json({ patient });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  });
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

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;

  res.status(200).json({ patient });
};
