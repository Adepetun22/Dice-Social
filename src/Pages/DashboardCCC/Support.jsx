import Support from "../../components/Support";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const navigate = useNavigate();
  
  const handleTicketSubmit = (ticketData) => {
    // Handle ticket submission for CCC
    console.log('CCC Support ticket submitted:', ticketData);
    // In a real app, you would make an API call here
  };

  const handleViewTicket = (ticket) => {
    // Handle view ticket for CCC
    console.log('View ticket for CCC:', ticket);
    // Navigate to ChatRoomCCC
    navigate('/ChatRoom');
  };

  return (
    <Support 
      title="Support"
      onTicketSubmit={handleTicketSubmit}
      onViewTicket={handleViewTicket}
      showCreateTicketButton={true}
    />
  );
};

export default SupportPage;