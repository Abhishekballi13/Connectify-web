import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error-animation.json"; // Add an animation file

const ErrorPage = ({ message }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            {/* Animated Error Illustration */}
            <div className="w-64">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            <h1 className="text-4xl font-bold text-red-500 mt-5">Oops!</h1>
            <p className="text-gray-300 mt-2 text-lg animate-pulse">{message || "Something went wrong."}</p>

            <button
            onClick={() => navigate("/")}
            className="relative px-5 py-2 text-white bg-blue-500 rounded-lg overflow-hidden shadow-lg group mt-2">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-500"></span>
            <span className="relative">Go Back</span>
        </button>
        </div>
    );
};

export default ErrorPage;

