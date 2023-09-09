import axios from 'axios';

const PayPalButton = () => {
    const passive = localStorage.getItem("passive");
    const parsedPassive = JSON.parse(passive!);
    console.log('parsedPassive', parsedPassive)


    const createOrder = async () => {
        try {
            const response = await axios.post(
                'http://192.168.68.50:4000/api/create-payment', parsedPassive
            );
            console.log(response);
            const approvalUrl = response.data.approval_url;
            window.location.replace(approvalUrl);
        } catch (error) {
            console.error('Error creating PayPal payment:', error);
        }
    };

    return (
        <button
            onClick={createOrder}
            style={{
                backgroundColor: '#C1FAA6',
                color: '#001F3F',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                marginTop: "2rem",
                width: "12.5rem",
                fontWeight: '700'

            }}
        >
            Book Call
        </button>
    );
};

export default PayPalButton;
