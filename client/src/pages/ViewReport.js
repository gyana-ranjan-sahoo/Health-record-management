import { useParams } from 'react-router-dom';

const ViewReport = () => {
  const { healthID, report } = useParams();
  const imgUrl = `/doctor/photos/${healthID}/${report}`;

  return <img src={imgUrl} loading='lazy' alt='report' />;
};

export default ViewReport;
