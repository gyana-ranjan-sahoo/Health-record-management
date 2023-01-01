/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import patient_profile from '../../assets/img/dashboard/patient2_pbl.png';
import axios from 'axios';

const PatientReportUpload = (props) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState('01/01/2006');
  const [patient, setPatient] = useState({
    name: {
      firstName: '',
      middleName: '',
      surName: '',
    },
    dob: '',
    mobile: '',
    email: '',
    adharCard: '',
    bloodGroup: '',
    address: {
      building: '',
      city: '',
      taluka: '',
      district: '',
      state: '',
      pincode: '',
    },
    password: '',
    diseases: [{ disease: '', yrs: '' }],
    contactPerson: {
      name: {
        firstName: '',
        surName: '',
      },
      mobile: '',
      email: '',
      relation: '',
      address: {
        building: '',
        city: '',
        taluka: '',
        district: '',
        state: '',
        pincode: '',
      },
    },
  });
  const [prescriptions, setPrescriptions] = useState([{}]);

  //TODO: add more fields here
  const [formValues, setFormValues] = useState({
    blood_test: '',
    MRI: '',
    allergy_test: '',
    blood_sugar_test: '',
    ct_scan_test: '',
    DNA_test: '',
    ECG_test: '',
    TB_test: '',
    thyroid_test: '',
    vitamin_test: '',
    xray_test: '',
  });
  const formData = new FormData();

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // input change
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // add more formdata here
    formValues.blood_test &&
      formData.append('blood_test', formValues.blood_test);
    formValues.MRI && formData.append('MRI', formValues.MRI);
    formValues.allergy_test &&
      formData.append('allergy_test', formValues.allergy_test);
    formValues.blood_sugar_test &&
      formData.append('blood_sugar_test', formValues.blood_sugar_test);
    formValues.ct_scan_test &&
      formData.append('ct_scan_test', formValues.ct_scan_test);
    formValues.DNA_test && formData.append('DNA_test', formValues.DNA_test);
    formValues.ECG_test && formData.append('ECG_test', formValues.ECG_test);
    formValues.TB_test && formData.append('TB_test', formValues.TB_test);
    formValues.thyroid_test &&
      formData.append('thyroid_test', formValues.thyroid_test);
    formValues.vitamin_test &&
      formData.append('vitamin_test', formValues.vitamin_test);
    formValues.xray_test && formData.append('xray_test', formValues.xray_test);

    try {
      const res = await axios.post('/upload', formData);

      // console.log(res);

      if (res.status === 200) {
        props.settoastCondition({
          status: 'success',
          message: 'Reports uploaded Successfully!!!',
        });
        props.setToastShow(true);
        navigate('/patient/dashboard');
      }
    } catch (err) {
      console.log(err.response);
      props.settoastCondition({
        status: 'error',
        message: 'Something went wrong!!!',
      });
      props.setToastShow(true);
    }
  };

  useEffect(() => {
    async function getpatient() {
      const res = await fetch('/getpatient');
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: 'info',
          message: 'Please Login to proceed!!!',
        });
        props.setToastShow(true);
        navigate('/');
      } else {
        setPatient(data.patient);
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
        setDob(convertDatetoString(patient.dob));
      }
    }
    getpatient();
  }, []);

  return (
    <div className='col-span-10 border'>
      <div className='px-12 my-4'>
        <Link to='/patient/profile'>
          <div className='flex bg-white rounded shadow  px-4   ml-auto h-14 w-1/5 mr-8 mt-8'>
            <img
              src={patient_profile}
              className='w-12 p-1 rounded-2xl'
              alt='profile'
            ></img>
            <div className='grid grid-rows-2 ml-4 gap-2  mb-4'>
              <div className='mt-4 ml-4  font-bold font-poppins'>
                <h1 className='ml-2'>
                  {`${patient.name.firstName} ${patient.name.surName}`}
                </h1>
              </div>
            </div>
          </div>
        </Link>
        <div className='font-bold text-xl'>
          <h1>Upload Patient Reports</h1>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className='shadow p-4 rounded-md bg-white my-4 w-fit'
        >
          {/* blood test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='blood_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Blood test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='blood_test'
              accept='image/*'
              name='blood_test'
              onChange={handleInputChange}
            />
          </div>

          {/* mri */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='MRI'
              className='w-fit min-w-[100px] block form-label'
            >
              MRI
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='MRI'
              accept='image/*'
              name='MRI'
              onChange={handleInputChange}
            />
          </div>

          {/* allergy test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='allergy_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Allergy test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='allergy_test'
              accept='image/*'
              name='allergy_test'
              onChange={handleInputChange}
            />
          </div>

          {/* blood_sugar_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='blood_sugar_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Blood sugar
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='blood_sugar_test'
              accept='image/*'
              name='blood_sugar_test'
              onChange={handleInputChange}
            />
          </div>

          {/* ct_scan_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='ct_scan_test'
              className='w-fit min-w-[100px] block form-label'
            >
              CT Scan test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='ct_scan_test'
              accept='image/*'
              name='ct_scan_test'
              onChange={handleInputChange}
            />
          </div>

          {/* DNA_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='DNA_test'
              className='w-fit min-w-[100px] block form-label'
            >
              DNA test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='DNA_test'
              accept='image/*'
              name='DNA_test'
              onChange={handleInputChange}
            />
          </div>

          {/* ECG_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='ECG_test'
              className='w-fit min-w-[100px] block form-label'
            >
              ECG test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='ECG_test'
              accept='image/*'
              name='ECG_test'
              onChange={handleInputChange}
            />
          </div>

          {/* TB_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='TB_test'
              className='w-fit min-w-[100px] block form-label'
            >
              TB test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='TB_test'
              accept='image/*'
              name='TB_test'
              onChange={handleInputChange}
            />
          </div>

          {/* thyroid_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='thyroid_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Thyroid test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='thyroid_test'
              accept='image/*'
              name='thyroid_test'
              onChange={handleInputChange}
            />
          </div>

          {/* vitamin_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='vitamin_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Vitamin test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='vitamin_test'
              accept='image/*'
              name='vitamin_test'
              onChange={handleInputChange}
            />
          </div>

          {/* xray_test */}
          <div className='mb-3 flex gap-4 md:gap-8 items-center'>
            <label
              htmlFor='xray_test'
              className='w-fit min-w-[100px] block form-label'
            >
              Xray test
            </label>
            <input
              className='form-control block  px-3 py-3 text-base font-normal   text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              type='file'
              id='xray_test'
              accept='image/*'
              name='xray_test'
              onChange={handleInputChange}
            />
          </div>

          <button
            type='submit'
            className='bg-primary px-4 py-2 font-bold text-white rounded-md'
          >
            Upload
          </button>
        </form>
      </div>

      <div className='-mt-20 mb-0'>{/* <Footer></Footer> */}</div>
    </div>
  );
};
export default PatientReportUpload;
