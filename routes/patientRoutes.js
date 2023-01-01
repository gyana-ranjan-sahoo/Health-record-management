const { Router } = require('express');
const {
  preview_prescription,
  get_patient,
  upload_reports,
  photo,
} = require('../controllers/patientControllers');
const { requirePatientAuth } = require('../middlewares/patientAuthMiddleware');
const router = Router();

router.get('/prescription/:id', requirePatientAuth, preview_prescription);
router.get('/getpatient', requirePatientAuth, get_patient);
router.post('/upload', requirePatientAuth, upload_reports);
router.get('/patient/photos/:healthID/:report', requirePatientAuth, photo);

module.exports = router;
