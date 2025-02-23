import axios from "axios"
import { BASE_URL } from "../utils/constants"


const Premium = () => {

 const handleBuyClick = async (membershipType) => {
      const order = await axios.post(BASE_URL + "/payment/create",{
        membershipType:membershipType,
      },{
         withCredentials:true,
      })

      const {amount,keyId,currency,notes,orderId} = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'Acme Corp',
        description: 'Connect to other developers',
        order_id: orderId, // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/payment-success', // Your success URL
        prefill: {
          name: notes.firstName+" "+notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log(order);
 } 

  return (
    <div className="m-10">
            <div className="flex w-full">
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                <h1 className="font-bold text-3xl">Silver Membership</h1>
                <ul>
                    <li> - Chat with other people</li>
                    <li> - 100 Connection request per day</li>
                    <li> - Blue Tick</li>
                    <li> - 3 months</li>
                </ul>
                <button className="btn btn-secondary" onClick={() => handleBuyClick("silver")}>Buy Silver</button>
            </div>
            <div className="divider divider-horizontal">OR</div>
            <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
                <ul>
                    <li> - Chat with other people</li>
                    <li> - Infinite Connection request per day</li>
                    <li> - Blue Tick</li>
                    <li> - 6 Months</li>
                </ul>
                <button className="btn btn-primary" onClick={() => handleBuyClick("gold")}>Buy Gold</button>
            </div>
    </div>
    </div>
  )
}

export default Premium