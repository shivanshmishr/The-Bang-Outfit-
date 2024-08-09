import React, { useState } from "react";
import { Cart, OrderDetails, OrderStatus } from "../components";
import { client } from "../lib/client";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { SignIn } from "../components";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MakePayment from "@/components/CheckoutComponents/MakePayment";

export default function checkout() {
  // User Authentication
  const { data: session } = useSession();
  const { cartItems } = useStateContext();

  const [activeStep, setActiveStep] = useState(0);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const steps = [
    { label: "Shopping Cart", component: <Cart /> },
    { label: "Order Details", component: <OrderDetails /> },
    {
      label: "Order Status",
      component: <OrderStatus orderConfirmed={!paymentFailed} />,
    },
  ];

  const router = useRouter();

  const handleStepChange = (index) => {
    if (index === activeStep + 1) {
      if (index === 1 && cartItems.length === 0) {
        toast.error("Your cart is empty. Please add items to proceed.");
        return;
      }
    }
    setActiveStep(index);
  };

  const handlePayNow = () => {
    if (activeStep === 1 && cartItems.length > 0) {
      setPaymentCompleted(true); 
      setActiveStep(2); 
    } else {
      setPaymentFailed(true);
      toast.error("Your cart is empty or payment could not be processed.");
      setActiveStep(2); // Set the active step to Order Status even on payment failure
    }
  };

  const handlePlaceOrder = ()=>{
    if(cartItems.length > 0){
      console.log("Cart Data:",cartItems);
      handleStepChange(activeStep + 1, cartItems);
    } else{
      toast.error("Your cart is empty. Please add items to proceed.")
    }
  };

  const handlePaymentSuccess = (response) => {
    console.log("Payment Success", response);
    setPaymentCompleted(true);
    setActiveStep(2);
  }

  const handleFailPayment = () => {
    setPaymentFailed(true);
    setActiveStep(2);
  };

  if (!session) {
    return <SignIn />;
  }

  return (
    <div className="w-[90%] mx-auto mb-[4vh] mt-[6vh]">
      <div className="flex flex-row justify-between items-center relative my-[10vh] -z-50">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            {index !== 0 && (
              <div className="h-[0.2vh] bg-gray-500 left-[15%] w-[69%] mx-auto absolute -z-50"></div>
            )}
            <div className="flex flex-row items-center px-[2vh] bg-white">
              <p
                className={`text-[2.4vh] flex flex-row  items-center justify-center font-semibold rounded-full ${
                  activeStep > index || (paymentCompleted && index === 2)
                    ? "bg-green-700 text-white"
                    : paymentFailed && index === 2
                    ? "bg-red-500 text-white"
                    : "bg-purple-700 text-white"
                } w-[5vh] h-[5vh] mr-[1.5vh]`}
              >
                {(activeStep > index || (paymentCompleted && index === 2)) &&
                !paymentFailed ? (
                  <span>&#10003;</span>
                ) : paymentFailed && index === 2 ? (
                  <span className="flex flex-row justify-center items-center">
                    <FontAwesomeIcon className="text-white text-[3vh]" icon="fa-solid fa-xmark" />
                  </span>
                  // 
                ) : (
                  index + 1
                )}
              </p>
              <h2
                className={`text-[2.8vh] font-medium ${
                  activeStep > index || (paymentCompleted && index === 2)
                    ? "text-green-700"
                    : "bg-white"
                }`}
              >
                {step.label}
              </h2>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div>{steps[activeStep].component}</div>

      <div className="flex justify-end mt-4">
        {activeStep === 0 && (
          <>

            {activeStep === 0 && !cartItems.length == 0 && (
              <button
                // onClick={() => handleStepChange(activeStep + 1)}
                onClick={handlePlaceOrder}
                disabled={activeStep === steps.length - 1}
                className="bg-[#141414] shadow-md text-white hover:scale-110 font-bold font-poppins px-[4vh] py-[1.5vh] "
              >
                PLACE ORDER
              </button>
            )}

          </>
        )}

        {activeStep === 1 && (
          <div>
            <MakePayment onPaymentSuccess={handlePaymentSuccess} />
          </div>
        )}

      </div>
    </div>
  );
}
