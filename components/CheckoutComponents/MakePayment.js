import React,{useState} from "react";
import { useStateContext } from "../../context/StateContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

const MakePayment = (
  { onPaymentSuccess }
) => {
  const { totalPrice } = useStateContext();
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    setLoading(true);
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setLoading(false);
      return;
    }
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taxAmt: totalPrice,
      }),
    }).then((t) => t.json());
  
    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "The Bang Outfit",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Pls make payment to confirm your order",
      image:
        "https://thebangoutfit.com/static/media/logo.ba255e0c7b5d4065559c.png",
      handler: function (response) {
        // alert("Razorpay Response: " + response.razorpay_payment_id);
        onPaymentSuccess(response);
      },
      // prefill: {
      //   name: "gaurav madan",
      //   email: "gauravmadan2004@gmail.com",
      //   contact: "9689675896",
      // },
      theme:{
        color:'#541675'
      }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  
    setLoading(false);
  };
  

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      <button
        className="bluebtn p-[1.5vh] text-white"
        onClick={() => makePayment()}
      >
        {loading?(
            <div className="flex justify-center items-center text-white">
                <div className="loader">
                    <CircularProgress size={24} color="inherit"/>
                </div>
            </div>
        ):(
          <div>
            Pay Now!
          </div>
        )}
      </button>
    </div>
  );
};

export default MakePayment;