import Lottie from 'lottie-react';
import LoaderJSON from '../assets/loader.json';
const Loader = ({ size = 100, message = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       <Lottie animationData={LoaderJSON} loop autoplay style={{width: size, height: size}} />
      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
  );
};

export default Loader;
